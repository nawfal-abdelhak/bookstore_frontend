import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';

@Component({
  selector: 'app-pdf-content',
  templateUrl: './pdf-content.component.html',
  styleUrls: ['./pdf-content.component.scss']
})
export class PdfContentComponent implements OnInit {

  constructor(public book_sevice:BookServiceService) { }

  ngOnInit(): void {
    console.log(this.book_sevice.cuurentPDF)
  }

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;
  zoom = 1.0;
  classApplied = false;
  

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
  

}
