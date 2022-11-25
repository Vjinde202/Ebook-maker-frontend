import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
selectedFile?:File;
  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router) { }

    id!:number;
    book={} as Book;
    progress:number=0;
    Data:String=''
    message = ''
    maxlength=10;
    req:Request[]=[];
    res:Request[]=[];
  
   
  
    isRequested=false;
  
  
   
  
    Books:any[]=[]
  

  ngOnInit(): void {
  this.id=this.route.snapshot.params['id'];

    this.bookService.getBookById(this.id).subscribe(data =>
      {
        this.book=data;
      },
      error=> console.log(error)
      );
  }
  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  onSubmit()
  {
    this.bookService.updateBook(this.id, this.book).subscribe(
      data =>
      {
        this.goToAuthor();
      },
    error=>console.log(error)
    );
  }

  goToAuthor()
  {
    this.router.navigate(['/user']);
  }

}
