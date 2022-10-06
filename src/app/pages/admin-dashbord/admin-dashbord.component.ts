import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BookServiceService } from 'src/app/services/book-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent implements OnInit {

  constructor(public book_sevice:BookServiceService,public userService:UserServiceService,private helper:HelpersService) { }
  
  books:any=null
  totalepages:number
  totalepagesReaders:number
  readers:any=null
  authors:any=null

  showauthors:boolean=false
  showbooks:boolean=true
  showreaders:boolean=false
  ngOnInit(): void {
    this.helper.shownav=false
    this.getBooks()
    this.getReaders()
    this.getAuthors()
    this.getBooksBySelles()
    this.getPurcentGnere()
  }

  public barChartLabels = ['name1', 'name2', 'name3', 'name5', 'name0', 'name1'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'books by selles'},
    
  ];

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [1000, 150, 180, 90];
  public doughnutChartType = 'doughnut';
  public chartPlugins = [pluginDataLabels]


  getPurcentGnere(){
    this.book_sevice.getPurcentGnere().then((data: any) => {
    console.log(data)
      let data1=[];
      let data2=[]
   
    data.forEach(element => {
      data1.push(element.selles)
      data2.push(element.genre.name)
  
      
    });
    this.doughnutChartLabels= data2;

    this.doughnutChartData=data1
   

  });
  }

  getBooksBySelles(){

    this.book_sevice.getBooksBySells().then((data: any) => {
        let data1=[];
        let data2=[]
     
      data.content.forEach(element => {
        data1.push(element.selles)
        data2.push(element.name)
    
        
      });
      this.barChartData= [
        {data: data1, label: 'books by selles'},
      ];

      this.barChartLabels=data2
     
    
     
    });
  }


  switch(ind){
    switch (ind) {
      case 1:
        this.showbooks=true
        this.showauthors=false
        this.showreaders=false
        break;
        case 2:
          this.showbooks=false
          this.showauthors=false
          this.showreaders=true
        break;
        case 3:
          this.showbooks=false
          this.showauthors=true
          this.showreaders=false
        break;
    
      
    }
  }

  getBooks(){
    this.book_sevice.getBooks().then((data: any) => {
    
      this.books= data;
      this.totalepages=data.totalPages;
      
    });
    
  }

  getAuthors(){
    this.userService.getAuthors().then((data: any) => {
     
      this.authors= data;
      // this.totalepages=data.totalPages;
      
    })
  }

  getReaders(){
    this.userService.getReaders().then((data: any) => {
   
      this.readers= data;
      this.totalepagesReaders=data.totalPages;
      
    });
  }

  goToPage(page){
    

    this.book_sevice._page=page;
  
    this.getBooks();
    
   
   }


   goToPageReaders(page){
    
  
    this.userService._pagereader=page;
 
    this.getReaders()
    
   
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


  nextpageReaders(){
    this.userService._pagereader=this.userService._pagereader+1;
    this.getReaders();
    }
  
    previouspageReaders(){
      this.userService._pagereader=this.userService._pagereader-1;
      this.getReaders();
    }

 

  options: ChartOptions = {
    responsive: true,
    tooltips: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem, data) {
          let label = data.labels[tooltipItem.index];
          let count: any = data
            .datasets[tooltipItem.datasetIndex]
            .data[tooltipItem.index];
          return label + ": " + count+" selles";
        },
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          let percentage = (value * 100 / sum).toFixed(2) + "%";
          return percentage;
        },
        color: '#fff',
      }
    }



  };

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

  


}
