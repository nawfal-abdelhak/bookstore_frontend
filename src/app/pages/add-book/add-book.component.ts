import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  constructor(private book_service :BookServiceService,private router:Router) { }
  fileToUpload: File = null;
  imageToUpload: File = null;
  image:any ="assets/book_image_upload.png";
  ss:any=null;
  dropdownList = [ { id: 1, name: 'action' },
  { id: 2, name: 'Drama' },
  { id: 3, name: 'Romantic' },
  { id: 4, name: 'Supernatural' },];
  selectedItems = [];

  


  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  name:string=""
  description:string=""
  price:number=0

  
  
  ngOnInit(): void {
   console.log(this.dropdownList)
  }

  handleFileInput(e) {
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files[0];
    }
    
   
    
  
}

handleImageInput(e) {
  
  if (e.target.files.length > 0) {
    this.imageToUpload = e.target.files[0];
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    this.image = event.target.result;
  
  };
 

  reader.readAsDataURL(this.imageToUpload);
 

}



addBook(){

    this.book_service.addBook(this.fileToUpload,this.imageToUpload,this.name,this.price,this.description,this.selectedItems).then((data: any) => {
      console.log(data)
    });

    this.router.navigate(["/home"])
  
 
}






}
