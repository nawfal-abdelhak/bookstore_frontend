import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

 
  constructor(public book_service:BookServiceService,public userService:UserServiceService) { }
  

  ngOnInit(): void {
    this.getItems();
  }


  getItems(){
    this.userService.getWishItems(this.userService.user.client.id).then((data: any) => {
      this.book_service.wish_books=data
      console.log(this.book_service.wish_books)
    });
  }

  addToCart(Id,item,index,id){
    this.userService.addTocart(this.userService.user.client.id,Id).then((data: any) => {
      console.log(data)
    });
     this.book_service.cart_books.push(item)
     this.book_service.wish_books.splice(index, 1);
     this.userService.deleteItemWishList(this.userService.user.client.id,id).then((data: any) => {
       console.log(data)
     });

  }

  


  deleteItem(index,id){
    this.book_service.wish_books.splice(index, 1);
    this.userService.deleteItemWishList(this.userService.user.client.id,id).then((data: any) => {
      console.log(data)
    });
  }

 

}
