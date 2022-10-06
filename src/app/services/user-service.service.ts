import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  user:any=null
  _pagereader:number=0

  constructor(private api :ApiService) { }

  addUser(username,email,password) {    
    return new Promise(async (resolve, reject) => {
      const Data ={
        "username":username,
     "password":password,
      "email":email,
      "role":"client"
      }
      let headers = this.api.getHeaders();
      this.api.post("Auth/signUp",Data, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  updateAuteur(email,username,about) {    
    return new Promise(async (resolve, reject) => {
      const Data ={
        "id":this.user.client.id,
      "username":username,
      "email":email,
      "bio":about,
      }

      console.log(Data)
      let headers = this.getHeadersWithAuthorization();
      this.api.put("auteur",Data, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });

  }

  updateClient(email,username) {    
    return new Promise(async (resolve, reject) => {
      const Data ={
        "id":this.user.client.id,
      "username":username,
      "email":email,
      
      }

      console.log(Data)
      let headers = this.getHeadersWithAuthorization();
      this.api.put("client",Data, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });

  }

  addAuthor(username,email,password,bio) {    
    return new Promise(async (resolve, reject) => {
      const Data ={
      "username":username,
      "password":password,
      "email":email,
      "role":"auteur",
      "bio":bio,
      }

      console.log(Data)
      let headers = this.api.getHeaders();
      this.api.post("Auth/signUp",Data, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  

  signIn(username,password) {    
    return new Promise(async (resolve, reject) => {
      const Data ={
        "username":username,
     "password":password,
      
      }
      let headers = this.api.getHeaders();
      this.api.post("Auth/signIn",Data, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  addTocart(clientId,book_Id){
   
    return new Promise(async (resolve, reject) => {
      // const bookId ={
      //  "id":book_Id,
      // }

      const formData = new FormData();
      formData.append('bookId', book_Id);
      let headers = this.getHeadersWithAuthorization();
      this.api.post("client/"+clientId+"/addCart",formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  deleteItem(clientId,bookId){
   
    return new Promise(async (resolve, reject) => {
     
      let headers = this.getHeadersWithAuthorization();
      this.api.delete("client/"+clientId+"/cart/"+bookId, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  emptyCart(clientId){
    return new Promise(async (resolve, reject) => {
     
      let headers = this.getHeadersWithAuthorization();
      this.api.delete("client/"+clientId+"/emptyCart", { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  getItems(clientId){
    return new Promise(async (resolve, reject) => {
    
      
      let headers = this.getHeadersWithAuthorization();
      this.api.get("client/"+clientId+"/cart", { headers })
        .then((data: any) => {
        
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  addToWishList(clientId,book_Id){
   
    return new Promise(async (resolve, reject) => {
     

      const formData = new FormData();
      formData.append('bookId', book_Id);
      let headers = this.getHeadersWithAuthorization();
      this.api.post("client/"+clientId+"/wishList",formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  makeOrder(clientId){
   
    return new Promise(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('clientId', clientId);
      let headers = this.getHeadersWithAuthorization();
      this.api.post("client/makeOrder",formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  getbooks(clientId){
    return new Promise(async (resolve, reject) => {
      let headers = this.getHeadersWithAuthorization();
      this.api.get("client/"+clientId+"/books", { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  getWishItems(clientId){
    return new Promise(async (resolve, reject) => {
     
      let headers = this.getHeadersWithAuthorization();
      this.api.get("client/"+clientId+"/wishList", { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  deleteItemWishList(clientId,bookId){
   
    return new Promise(async (resolve, reject) => {
     
      let headers = this.getHeadersWithAuthorization();
      this.api.delete("client/"+clientId+"/wishList/"+bookId, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  getFollow(clientId){
    return new Promise(async (resolve, reject) => {
     
      let headers = this.getHeadersWithAuthorization();
      this.api.get("client/"+clientId+"/follows", { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  FollowAuthor(clientId,auteurId){
    return new Promise(async (resolve, reject) => {
      // const bookId ={
      //  "id":book_Id,
      // }

      const formData = new FormData();
      formData.append('auteurId', auteurId);
      let headers = this.getHeadersWithAuthorization();
      this.api.post("client/"+clientId+"/follows",formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
}

getAuthorBooks(authorId){
  return new Promise(async (resolve, reject) => {
     
    let headers = this.api.getHeaders();
    this.api.get("auteur/"+authorId, { headers })
      .then((data: any) => {
        resolve(data);
      })
      .catch(err => {
        
      });
  });
}

getReaders() {    
  return new Promise(async (resolve, reject) => {
    let headers = this.getHeadersWithAuthorization();
    this.api.get("client/all?size=2"+'&page='+this._pagereader, { headers })
      .then((data: any) => {
        resolve(data);
      })
      .catch(err => {
        
      });
  });
}

getAuthors(){
  return new Promise(async (resolve, reject) => {
    let headers = this.getHeadersWithAuthorization();
    this.api.get("auteur/all?size=6"+'&page='+0, { headers })
      .then((data: any) => {
        resolve(data);
      })
      .catch(err => {
        
      });
  });
}


getTopAuthors(){
  return new Promise(async (resolve, reject) => {
    let headers = this.getHeadersWithAuthorization();
    this.api.get("auteur/top", { headers })
      .then((data: any) => {
        resolve(data);
      })
      .catch(err => {
        
      });
  });
}


 getHeadersWithAuthorization() {
    return new HttpHeaders({
      Authorization: this.user.token,
      Accept: "application/json"
    });
  }

}
