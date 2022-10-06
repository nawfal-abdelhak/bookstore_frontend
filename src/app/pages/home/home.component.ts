import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { HelpersService } from 'src/app/services/helpers.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  books:any=[]
  totalepages:number;
  genres:any=[]
  romantic:boolean=false
  drama:boolean=false
  supernatural:boolean=false
  action:boolean=false

  selectedOption:string="Recommande pour vous";
  constructor(public helper:HelpersService,public book_sevice:BookServiceService,private notificationService:NotificationsService, public userService:UserServiceService) { }
  authors:any=null
  userbooks:any
  ngOnInit(): void {
    this.getUserbooks()
    setTimeout(() => {
      this.helper.shownav=true
    }, 10);
    this.getBooks();
    if(this.userService.user)
    this.getAuthors()
   
  
  }

  getUserbooks(){
    this.userService.getbooks(this.userService.user.client.id).then((data: any) => {
      this.userbooks=data
      
    });
  }

  getAuthors(){
    this.userService.getTopAuthors().then((data: any) => {
      
      this.authors= data;
      console.log(this.authors)
      
     
    });
  }


  selectSort(value: string){
    
      switch(value) {
        case "1":
          this.getBooks();
           break;
        case "2":
           this.getBooksBySelles()
           break;
        case "3":
           this.getBooksByPrice()
           break;
      
    }
 
    
  }
  getBooksBySelles(){

  this.book_sevice.getBooksBySells().then((data: any) => {
      
    this.books= data;
    this.totalepages=data.totalPages;
   
  });
}


getBooksByPrice(){

  this.book_sevice.getBooksByPrice().then((data: any) => {
    this.books= data;
    this.totalepages=data.totalPages;
   
  });
}


  
  onSearchChange(searchValue: any): void {  
    if(searchValue.value==""){
      this.getBooks();
    }

    if(searchValue.value!="")
    {
      this.book_sevice.getSearchedBooks(searchValue.value).then((data: any) => {
        this.books= data;
       
    });
  }
  }

  addGenre(genre){
   
    if(this.genres.length==0){
      this.genres.push(genre)
      return 
    }

    if(this.genres.length>0)
     {
      for(let i=0;i<this.genres.length;i++){
        if(this.genres[i]===genre)
        {
          console.log("it should")
        this.genres.splice(i, 1); 
        return
        }
            
      }
    }

      this.genres.push(genre)
       
    
    
    
     

  }

  getBooks(){
   

    this.book_sevice.getBooksByGenres(this.genres).then((data: any) => {
      
      this.books= data;
      this.totalepages=data.totalPages;
     
    });
    
  }

  filterByGnere(){
    this.book_sevice.getBooksByGenres(this.genres).then((data: any) => {
      
      this.books= data;
      this.totalepages=data.totalPages;
     
    });
  }


  goToPage(page){
    this.book_sevice._page=page;
    this.getBooks();
   }



  counter(i: number) {
    return new Array(i);
}


nextpage(){
  this.book_sevice._page=this.book_sevice._page+1;
  this.getBooks();
  }

  previouspage(){
    this.book_sevice._page=this.book_sevice._page-1;
    this.getBooks();
  }

}
