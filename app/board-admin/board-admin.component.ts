import { Component, OnInit } from '@angular/core';
import { AuthorAdminService } from '../author-admin.service';
import { Request } from '../request';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {



  userdetails !: any[];

  req:any[]=[];
  rej:any[]=[];
  res:Request[]=[];
  data:String=''
  resI:Request=new Request('','',0,'')
  isDisabled=false;


  constructor(private userService : UserService,private AdminUserService:AuthorAdminService) { }

  ngOnInit(): void {
    this.getUsers();
    this.res=[];
    this.req=this.AdminUserService.getReq();
    console.log(this.req);



    

    
}


  private getUsers()
  {
    this.userService.getUserList().subscribe({
      next:data=>{
        this.userdetails=data;
      },
      error:err=>
      console.log(err)
    });
     
  }
  click(Bookid:number){
    this.req.forEach((data)=>{
      if(data.bookId==Bookid){
        this.resI=new Request(data.Username,data.bookTitle,Bookid,`http://localhost:8081/api/books/download/${Bookid}`)
        this.res.push(this.resI);
      
        console.log(this.res);
      }
    });
    this.req = this.req.filter((item)=>{
      if(item.bookId!=Bookid){
        return item;
      }
    });
    this.AdminUserService.setRes(this.res);


   
  
}
reject(id:number){
  this.req=this.req.filter((item)=>{
    if(item.bookId!=id){
      return item;
    }
  })
}
  
   
}
