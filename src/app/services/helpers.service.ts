
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

// import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {


  constructor(

  
   
  ) { }

  shownav:boolean=true

  formatDateTime(date) {
    if (!date) return "";
    let newDate = new Date(date);
    let year = newDate.getFullYear();
    let month = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
    let day = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
    let hours = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    let minutes = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  }
  


}
