import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 

  constructor( private elementRef:ElementRef, public helper:HelpersService,public userService:UserServiceService,public router:Router) { }
 
  showSignUp:boolean=true
  role:string="client"

  username:string=""
  password:string=""
  email:string=""

  usernameS:string=""
  passwordS:string=""

  about:string=""



  ngOnInit(){
    
   
    // this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#262626';
   
 }

 signUpAsClient(){

  this.userService.addUser(this.username,this.email,this.password).then((data: any) => {
    this.userService.user=data

    localStorage.setItem('user', JSON.stringify(data));
    console.log(this.userService.user)
   
    this.router.navigate(["/home"])

  });
}


signUpAsAuthor(){

  this.userService.addAuthor(this.username,this.email,this.password,this.about).then((data: any) => {
    

    localStorage.setItem('user', JSON.stringify(data));
    this.router.navigate(["/home"])
  });
}


  signIn(){

    this.userService.signIn(this.usernameS,this.passwordS).then((data: any) => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data));
      this.userService.user=data
      if(this.userService.user.client.username == "admin"){

        console.log("hello")
        this.router.navigate(["/dashbord"])
    
      }
      else
      this.router.navigate(["/home"])
    });

 

  }
}


