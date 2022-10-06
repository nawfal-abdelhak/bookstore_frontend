import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
 author:any=null;
  constructor(public userService:UserServiceService,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      const auteurId=paramMap.get('auteurId')
       
      this.userService.getAuthorBooks(auteurId).then((data: any) => {
        this.author=data
        
        console.log(this.author)
      });
      console.log(auteurId)
      
    })
  }

}
