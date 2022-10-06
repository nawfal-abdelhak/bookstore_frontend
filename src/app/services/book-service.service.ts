import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
//   test:string="C:\Users\nawfal\Documents\pdf_pict\Calcul du ROI énoncé.pdf"
  
// pdf:File=new FileReader(test)
_page:number=0;
cart_books:any=[]
wish_books:any=[]
cuurentPDF:any=null;
user_books:any=[]

  constructor(private api :ApiService,private userService:UserServiceService) { }


  getBooks() {    
    return new Promise(async (resolve, reject) => {
      let headers = this.api.getHeaders();
      this.api.get("book/all?size=6"+'&page='+this._page, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }

  getBooksBySells(){
    return new Promise(async (resolve, reject) => {
      let headers = this.api.getHeaders();
      this.api.get("book/bySelles?size=6"+'&page='+this._page, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  getPurcentGnere(){
    return new Promise(async (resolve, reject) => {
      let headers = this.api.getHeaders();
      this.api.get("book/genreStats", { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }
  getBooksByPrice(){
    return new Promise(async (resolve, reject) => {
      let headers = this.api.getHeaders();
      this.api.get("book/byPrice?size=6"+'&page='+this._page, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  getSearchedBooks(searchKey){
    
      return new Promise(async (resolve, reject) => {
        let headers=this.api.getHeaders()
        this.api.get("book/search/"+searchKey, { headers })
          .then((data: any) => {
            resolve(data);
          })
          .catch(err => {
            
          });
      });
    
  }
 


  getBook(id) {    
    return new Promise(async (resolve, reject) => {
      let headers = this.api.getHeaders();
      this.api.get("book/"+id, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  addBook(content,image,name,price,description,genres) {    
    return new Promise(async (resolve, reject) => {
      const auteur = {
        "id":this.userService.user.client.id,
        "username":this.userService.user.client.username
      }

     
    
      const book={"name":name,
      "price":price,
      "description":description,
       "auteur":auteur,
       "genres":genres
    }
    console.log(content)

    console.log(image)

       var Book = JSON.stringify(book);
      // var genres = JSON.stringify(genre);
     
      const formData = new FormData();
      formData.append('content', content);
      formData.append('cover', image);
      formData.append('book', Book);

      console.log(book)
      

 

 

      let headers = this.api.getHeaders();
      
      this.api.post("book/addBook",formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
    });
  }


  getBooksByGenres(genres) {    
    return new Promise(async (resolve, reject) => {
      let headers = this.api.getHeaders();
      let collector="";
      
        for(let i=0;i<genres.length;i++){
          collector+=genres[i]+","
      }

      let lastCollect=collector.substring(0, collector.length - 1);

      if(genres[0]==undefined){
        console.log("empty")
        this.api.get("book/all?size=6"+'&page='+this._page, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });

      }
     
      else{
        console.log("full")
        console.log(genres[0])
        this.api.get("book/genres?genresId="+lastCollect+"&size=6"+'&page='+this._page, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {
          
        });
      }
      
    });
  }

  rate(bookId,userId,value){
    return new Promise(async (resolve, reject) => {
      const userid = userId
      const valuee = value

      const formData = new FormData();
      formData.append('value', valuee);
      formData.append('userId', userid);
      
      let headers = this.userService.getHeadersWithAuthorization();
      this.api.post("book/"+bookId+"/rate", formData, { headers })
        .then((data: any) => {
          resolve(data);
        })
        .catch(err => {

        });
    });
  }


}
