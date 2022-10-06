import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private api: ApiService, private userService: UserServiceService) { }



  addcomment(content, user_id, book_id) {
    return new Promise(async (resolve, reject) => {

      const body = {
        "contenu": content, "user": {
          "id": user_id
        },
        "bookId": book_id
      }
      let headers = this.userService.getHeadersWithAuthorization();
      this.api.post("comment/addComment", body, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {

        });
    });
  }

  deleteComment( commentid) {
    return new Promise(async (resolve, reject) => {
     
      

      let headers = this.userService.getHeadersWithAuthorization();
      this.api.delete("users/" + commentid + "/comment", {headers})
      // , { headers }
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {

        });
    });
  }

  editComment(userId, commentid, content) {
    return new Promise(async (resolve, reject) => {

      const comment = content
      const commentId = commentid

      const formData = new FormData();
      formData.append('comment', comment);
      formData.append('commentId', commentId);
      let headers = this.userService.getHeadersWithAuthorization();
      this.api.put("users/" + userId + "/comment", formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {

        });
    });
  }
}





