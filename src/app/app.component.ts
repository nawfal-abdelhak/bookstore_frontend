import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from './services/api.service';
import { BookServiceService } from './services/book-service.service';
import { HelpersService } from './services/helpers.service';
import { NotificationsService } from './services/notifications.service';
import { UserServiceService } from './services/user-service.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },
  { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/tables', title: 'Tables', icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', class: '' },
  { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'front-spring';

  constructor(
    public api: ApiService,
    private router: Router,
    private platform: Platform,
    public userService: UserServiceService,
    public book_service: BookServiceService,
    private notificationService: NotificationsService,
    public helper: HelpersService

  ) {
    this.initializeApp();

  }
  notifications: any
  notifLenght: number = 0
  public menuItems: any[];
  public isCollapsed = false;



  ngOnInit() {
    console.log("hello")
    if(this.userService.user.client.username == "admin"){

    console.log("hello")
    this.router.navigate(["/dashbord"])

  }

    this.getNotifications()

    if(this.userService.user ){
    if (this.userService.user.client.role == "auteur") {
      this.notificationService.subscribe('/follow/' + this.userService.user.client.id, (): void => {

        this.getNotifications()

      });
    }
  }

    if(this.userService.user ){
    if (this.userService.user.client.role == "client") {
      this.notificationService.subscribe('/newBook/' + this.userService.user.client.id, (): void => {

        this.getNotifications()

      });
    }
  }
  }




  initializeApp() {


    var retrievedObject = localStorage.getItem('user');
    this.userService.user = JSON.parse(retrievedObject);
    console.log(this.userService.user)
    if(this.userService.user ){
    if (this.userService.user.client && this.userService.user.client.role == "client")
      this.getItems()
    }


  }

  getNotifications() {
    this.notificationService.getNotifications().then((data: any) => {
      console.log(data)
      this.notifications = data
      this.notifications.forEach(element => {
        if (!element.seen) {
          this.notifLenght++
        }
      });


    });
  }


  goTo() {
    this.router.navigate(['/register'])
    localStorage.removeItem('user');
  }

  getItems() {


    this.userService.getItems(this.userService.user.client.id).then((data: any) => {

      this.book_service.cart_books = data.books

    });
  }

  goToWishList() {
    if (this.userService.user == null) {
      this.router.navigate(['/register'])
    }
    else if (this.userService.user != null) {
      this.router.navigate(['/wishList'])
    }
  }



  goToProfile() {
    if (this.userService.user == null) {
      this.router.navigate(['/register'])
    }
    else if (this.userService.user != null) {
      this.router.navigate(['/profile'])
    }
  }


  notifSeen(notif) {
    this.notificationService.notifSenn(notif).then((data: any) => {

    });
    if (notif.redirect) {
      this.router.navigate(['/books/' + notif.redirect])
     
    }
    if (!notif.seen) {
      this.notifLenght--
      notif.seen = true
      

    }

  }







}

