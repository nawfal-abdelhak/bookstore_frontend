import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public book_service: BookServiceService, public userService: UserServiceService, private elementRef: ElementRef,private router:Router) { }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#F8F9FE';
  }

  totale_price: number

  ngOnInit() {
    this.getItems();
  }

  deleteItem(index, id, price) {



    Swal.fire({
      title: 'Are you sure',
      text: "about deleting this item?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.book_service.cart_books.splice(index, 1);
        this.userService.deleteItem(this.userService.user.client.id, id).then((data: any) => {
          
         
        });
        this.totale_price =this.totale_price-price;
        console.log("totale ptice"+this.totale_price)
        Swal.fire(

          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }

  emptyCart() {


    Swal.fire({
      title: 'Are you sure',
      text: "about clearing cart",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.totale_price = 0;
        this.book_service.cart_books = [];
        this.userService.emptyCart(this.userService.user.client.id).then((data: any) => {
          console.log(data)
        });
        Swal.fire(

          'cart!',
          'cleared',
          'success'
        )
      }
    })
  }


  getItems() {
    this.userService.getItems(this.userService.user.client.id).then((data: any) => {
      console.log(data.books)
      this.book_service.cart_books = data.books
      this.totale_price = data.totalPrice
      

    });
  }

  makeOrder() {
    Swal.fire({
      title: 'Confirm',
      text: "Your order",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.totale_price>this.userService.user.client.coins){
          Swal.fire({
            title: 'It looks like',
            text: "You dont have enough credits to prurchase",
            icon: 'error',
            showCancelButton: true,
           
            cancelButtonColor: '#d33',
           
          })
        }
        else {
          this.userService.makeOrder(this.userService.user.client.id).then((data: any) => {
            
          });
          this.book_service.cart_books = [];
            
          Swal.fire({
            title: 'Congrats',
            text: "Your bought another book",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Check your library'
          }).then((result) => {
            if (result.isConfirmed) {
              this.userService.user.client.coins=this.userService.user.client.coins-this.totale_price
              localStorage.setItem('user', JSON.stringify(this.userService.user));
              console.log("coins  "+this.userService.user.client.coins)
              this.router.navigate(['/profile'])
            }
          })
        }
        
      }
    })

  }
}
