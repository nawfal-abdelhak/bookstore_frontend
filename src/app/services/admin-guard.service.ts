import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HelpersService } from './helpers.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(
    private userService: UserServiceService,private router:Router
  ) { }

  canActivate(): boolean {
    
    if (this.userService.user.client.username== "admin" ) {
      return true;
    } else {
      this.router.navigate(['/error']);
    }
    return false;
  }
  }

  // canDeactivate(): boolean {
  //   return this.helper.canDeactivate;
  // }

