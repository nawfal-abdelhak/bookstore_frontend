import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userService:UserServiceService,public bookService:BookServiceService) { }
author:any;
showEdit:boolean=false
userbooks:any=null;

username:string=""
email:string=""

public barChartLabels = ['hack your sleep', 'king arthur', 'her own dauther', 'seeing the big picture', 'on the road to eden'];
public barChartType = 'bar';
public barChartLegend = true;

public barChartData = [
  {data: [4, 3, 4, 2, 4, 3], label: 'books by selles'},
  
];





public barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }


};

about:string=""
  ngOnInit(): void {

    if(this.userService.user.client.role=="auteur"){
      this.about=this.userService.user.client.bio
      this.userService.getAuthorBooks(this.userService.user.client.id).then((data: any) => {
        this.author=data
        console.log(this.author)
      });
      
    }
    this.email=this.userService.user.client.email
    this.username=this.userService.user.client.username
    
    if (this.userService.user.client && this.userService.user.client.role == "client")
     this.getUserbooks()
    
  }

  updateUser(){
    if(this.userService.user.client.role=="auteur"){
      this.userService.updateAuteur(this.email,this.username,this.about).then((data: any) => {
       this.showEdit=false
       this.userService.user.client.username=data.username
       this.userService.user.client.email=data.email
       this.userService.user.client.bio=data.bio
       localStorage.setItem('user', JSON.stringify(this.userService.user));
       
       
      });
    }
    else {
      this.userService.updateClient(this.email,this.username).then((data: any) => {
        this.showEdit=false
        this.userService.user.client.username=data.username
        this.userService.user.client.email=data.email
        localStorage.setItem('user', JSON.stringify(this.userService.user));
       
      });
    }
  }


  getUserbooks(){
    this.userService.getbooks(this.userService.user.client.id).then((data: any) => {
      this.userbooks=data
      console.log(data)
    });
  }

}
