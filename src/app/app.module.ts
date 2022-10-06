import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 import { AppRoutingModule,routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ApiService } from './services/api.service';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { PdfContentComponent } from './pages/pdf-content/pdf-content.component';
import { CartComponent } from './pages/cart/cart.component';
import {ChartsModule} from  'ng2-charts'
import { ProfileComponent } from './pages/profile/profile.component';
 import { CommonModule } from '@angular/common';  
 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthorDetailsComponent } from './pages/author-details/author-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashbordComponent } from './pages/admin-dashbord/admin-dashbord.component';
import { ErrorComponent } from './pages/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
     routingComponents,
     BookDetailComponent,
     PdfContentComponent,
     CartComponent,
     ProfileComponent,
     AuthorDetailsComponent,
     AdminDashbordComponent,
     ErrorComponent,
    
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbModule,
    ChartsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
