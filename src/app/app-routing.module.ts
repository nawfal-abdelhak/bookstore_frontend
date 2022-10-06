import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { HomeComponent } from './pages/home/home.component';
 import { SignupComponent } from './pages/signup/signup.component';
 import { BookDetailComponent } from './pages/book-detail/book-detail.component';
 import { PdfContentComponent } from './pages/pdf-content/pdf-content.component';
 import { WishListComponent } from './pages/wish-list/wish-list.component';
 import { CartComponent } from './pages/cart/cart.component';
 import { ProfileComponent } from './pages/profile/profile.component';
 import { AddBookComponent } from './pages/add-book/add-book.component';
 import { AuthGuard } from './services/auth-guard.service';
 import { AdminGuard } from './services/admin-guard.service';
 import { AuthorGuard } from './services/author-guard.service';
 import {  SignupGuard } from './services/signup-guard.service';
 
 import { ErrorComponent } from './pages/error/error.component';
 import { AuthorDetailsComponent } from './pages/author-details/author-details.component';
 import { AdminDashbordComponent } from './pages/admin-dashbord/admin-dashbord.component';
 



const routes: Routes = [
  {
    path:'', component:HomeComponent,
   
  },
  {
    path:'error', component:ErrorComponent,
   
  },

  
  {
    path:'register', component:SignupComponent
  
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'books', 
    children: [
      { path: ':bookId', component:BookDetailComponent},
    ]
     
  },

  {
    path:'pdfConent', component:PdfContentComponent
  },

  {
    path:'wishList', component:WishListComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'cart', component:CartComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'profile', component:ProfileComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'addBook', component:AddBookComponent,
    canActivate: [AuthorGuard]
  },

  {
    path:'authorDetails', 

    children: [
      { path: ':auteurId', component:AuthorDetailsComponent},
    ],
    canActivate: [AuthGuard]
  },

  {
    path:'dashbord', component:AdminDashbordComponent,
     canActivate: [AdminGuard]
  },
  {
    path:'**', component:ErrorComponent,
   
  },






  

  

  
 
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 export const routingComponents= [SignupComponent,HomeComponent,BookDetailComponent,PdfContentComponent,WishListComponent,CartComponent,AddBookComponent,AuthorDetailsComponent,AdminDashbordComponent,ErrorComponent]
