import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorAdminService } from '../author-admin.service';
import { Book } from '../book';
import { Request } from '../request';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  BookUpload=false;
  book={} as Book;
  progress:number=0;
  Data:String=''
  message = ''
  maxlength=10;
  req:Request[]=[];
  res:Request[]=[];

  reqI:Request=new Request('','',0,'');

  isRequested=false;


  selectedFile?:File;

  Books:any[]=[]


  
  


  constructor(private userService:UserService,private tokenStorage:TokenStorageService,private adminUserService:AuthorAdminService,
    private http:HttpClient,
    private router: Router) {

   }

   showDownloads(){
    this.isRequested=true;
  }
  closeDownloads(){
    this.isRequested=false;
  }
downloadFile(url:any,filename:any):void{
  const downloadUrl =  url;
  const token = this.tokenStorage.getToken();
  /*const headers = new HttpHeaders().set('authorization','Bearer '+token);*/
  this.http.get(downloadUrl, { responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));

          downloadLink.setAttribute('download',filename );
          document.body.appendChild(downloadLink);
          downloadLink.click();

     });
}

  

  
  showForm(){
    this.BookUpload=true;
  }
  closeForm(){
    this.BookUpload=false;
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  showAll(){
    this.maxlength=this.book.bookDescription.length;
   


  }


  upload(){
    alert("Are you sure?")
    this.BookUpload=false;
    this.progress = 0;

    if (this.selectedFile) {
      const file: File | null = this.selectedFile;

      if (file) {
        console.log(file)
        this.Data=JSON.stringify({bookTitle:this.book.bookTitle,
                                  bookDescription:this.book.bookDescription,
                                  fileName:this.book.fileName,
                                  status:this.book.status,
                                  authorId:this.book.authorId});
        console.log(this.Data)
        this.userService.upload(this.selectedFile,this.Data).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
            
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.selectedFile = undefined;
          }
        });
      }
     
      this.selectedFile = undefined;
    }
    setTimeout(function(){
      window.location.reload();
   }, 5000);
    
  }
request(id:any,title:any){
  alert("Confirm Request?")
  this.res=[];
  this.reqI=new Request(this.tokenStorage.getUser().username,title,id,'');
  
  this.req.push(this.reqI);
  console.log(this.req);
  
  this.adminUserService.setReq(this.req);




}
  ngOnInit(): void {
      this.userService.getUserDetails(this.tokenStorage.getUser().id).subscribe({
        next:data=>{
            this.Books=data.books;
            console.log(this.Books);
        },
        error:err=>{
          console.log(err.error.message);

        }
      });
      this.book.authorId=this.tokenStorage.getUser().id;
      this.req=[]
      this.res =this.adminUserService.getRes();
      console.log(this.res);

  }

  updateBook(id: number){

    this.router.navigate(['updatebook',id]);

  }
 

}
