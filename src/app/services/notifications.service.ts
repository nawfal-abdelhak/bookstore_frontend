import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ApiService } from './api.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private api :ApiService,private userService:UserServiceService) { }
  private connecting: boolean = false;
  private topicQueue: any[] = [];
  notifications:any=[]

  socket = new SockJS('http://localhost:8080/notifications');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: any): void {
      // If stomp client is currently connecting add the topic to the queue
      if (this.connecting) {
          this.topicQueue.push({
              topic,
              callback
          });
          return;
      }

      const connected: boolean = this.stompClient.connected;
      if (connected) {
          // Once we are connected set connecting flag to false
          this.connecting = false;
          this.subscribeToTopic(topic, callback);
          return;
      }

      // If stomp client is not connected connect and subscribe to topic
      this.connecting = true;
      this.stompClient.connect({}, (): any => {
          this.subscribeToTopic(topic, callback);

          // Once we are connected loop the queue and subscribe to remaining topics from it
          this.topicQueue.forEach((item:any) => {
              this.subscribeToTopic(item.topic, item.callback);
          })

          // Once done empty the queue
          this.topicQueue = [];
      });
  }

  private subscribeToTopic(topic: string, callback: any): void {
      this.stompClient.subscribe(topic, (response?:string): any => {
          callback(response);
      });
  }


  getNotifications(){
    
        return new Promise(async (resolve, reject) => {
          let headers = this.userService.getHeadersWithAuthorization();
          this.api.get("users/"+this.userService.user.client.id+"/notifs", { headers })
            .then((data: any) => {
              resolve(data);
            })
            .catch(err => {
              
            });
        });
    
  }

  notifSenn(notif){
    return new Promise(async (resolve, reject) => {

        const formData = new FormData();
      formData.append('notifId', notif.id);
        let headers = this.userService.getHeadersWithAuthorization();
        this.api.put("users/seen",formData, { headers })
          .then((data: any) => {
            resolve(data);
          })
          .catch(err => {
            
          });
      });
  }
}
