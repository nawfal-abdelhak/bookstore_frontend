import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { CommentService } from 'src/app/services/comment.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
 op=3.5
  file:any="assets/Pride-and-Prejudice.pdf";
  rating = null;
  book:any=null;
  content:string="";
  followed:boolean=false
  show_rate:boolean=false
 editedContent:string="";
  edit:boolean=false
  editIndex:number=null
  constructor(private activatedRoute:ActivatedRoute,public book_service:BookServiceService ,private comment_service:CommentService 
    ,private router:Router,private userService:UserServiceService,private notificationService:NotificationsService,public helper:HelpersService
    ) { }

    userbooks:any

    showAdd:boolean=true

  ngOnInit(): void {
    this.getBook()
    
    
    

    
  }

  calculateDiff(dateSent){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    
    console.log(dateSent.getHours(),dateSent.getMinutes())
    let calc=Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),currentDate.getHours(),currentDate.getMinutes(),currentDate.getSeconds()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate(),dateSent.getHours(),dateSent.getMinutes(),dateSent.getSeconds()) ) /(1000  ))
    var d = Math.floor(calc / (3600*24));
    var h = Math.floor(calc % (3600*24) / 3600);
    var m = Math.floor(calc % 3600 / 60);
    var s = Math.floor(calc % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
   
}


  getUserbooks(){
    this.userService.getbooks(this.userService.user.client.id).then((data: any) => {
      this.userbooks=data
      this.userbooks.forEach(element => {
        if(element.id==this.book.id){
          this.showAdd=false
        }
      });
    });
  }

  showEditComment(i,content){
    this.editIndex=i;
    this.editedContent=content
  }
  
  rate(bookId){
    
    this.show_rate= !this.show_rate

    setTimeout(() => {
      this.book_service.rate(bookId,this.userService.user.client.id,this.rating).then((data: any) => {
        console.log(data)
        });
    }, 100);
    

    

 
  }

  
 

  deleteComment(commentId,index){
    this.comment_service.deleteComment(commentId).then((data: any) => {
       console.log(data)
     });

    this.book.comments.splice(index, 1);
  }
  editComment(commentId){
    this.comment_service.editComment(this.userService.user.client.id,commentId,this.editedContent).then((data: any) => {

     this.book.comments.forEach(element => {
       if(element.id==data.id){
         console.log(element)
         console.log(data)
          element.contenu=data.contenu
       }
            
          });
 
      
    });
    this.editIndex=null

  }

  getFollow(book){
    this.userService.getFollow(this.userService.user.client.id).then((data: any) => {
    
     data.forEach(element => {
       if(element.id==book.auteur.id){
         this.followed=true
       }
       
     });
    });
  }

  followAuyhor(id){
this.userService.FollowAuthor(this.userService.user.client.id,id).then((data: any) => {
 
 });

  }


  sendComment(){
    console.log(this.content)
    
    // this.comments.push({"client":"fahd","content":this.content})
    this.comment_service.addcomment(this.content,this.userService.user.client.id,this.book.id).then((data: any) => {
      console.log(data)
      this.book.comments.push(data)
      this.content=""
    });
  }

  addToCart(Id){
    
  if(this.userService.user){
    this.userService.addTocart(this.userService.user.client.id,Id).then((data: any) => {
    });
    this.book_service.cart_books.push(this.book)
  }
  else{
    Swal.fire({
      title: 'account required',
      text: "It looks like you dont have an acount",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Create an account'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/register'])
      
      }
    })
  }
    
   

  
 
}

addToWishList(Id){
 


  if(this.userService.user){
    this.userService.addToWishList(this.userService.user.client.id,Id).then((data: any) => {
  
    });
    this.book_service.wish_books.push(this.book)
  }
  else{
    Swal.fire({
      title: 'account required',
      text: "It looks like you dont have an acount",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Create an account'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/register'])
      
      }
    })
  }
  
}


  

  gotToPdfContent(pdfConent){
   
    this.book_service.cuurentPDF=pdfConent;
    this.router.navigate(['/pdfConent'])

    

  }



  getBook(){

    this.activatedRoute.paramMap.subscribe(paramMap=>{
      const bookId=paramMap.get('bookId')
       
      this.book_service.getBook(bookId).then((data: any) => {
        this.book= data;
        if(this.userService.user){
        if (this.userService.user.client && this.userService.user.client.role == "client")
        this.getUserbooks()
        }
        console.log(data)
        if(this.userService.user){
        if( this.userService.user.client && this.userService.user.client.role == "client")
        this.getFollow(data)
      }
      });
      
    })

    console.clear()
   
  }

 
  
}
