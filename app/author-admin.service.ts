
import { Injectable } from '@angular/core';

import { Request } from './request';
const REQUEST = 'request'
const RESULT = 'result'
@Injectable({
  providedIn: 'root'
})
export class AuthorAdminService {


  

  setReq(req:Request[]){
    window.localStorage.removeItem(REQUEST)
    window.localStorage.setItem(REQUEST,JSON.stringify(req));
        

  }
  getReq():any{

    let data:any=window.localStorage.getItem(REQUEST)
    
    return JSON.parse(data);



  }

  setRes(res:Request[]){

    window.localStorage.removeItem(REQUEST);
    window.localStorage.setItem(RESULT,JSON.stringify(res));

  }
  getRes():any{
    let data:any=window.localStorage.getItem(RESULT);
    return JSON.parse(data);
  }

  constructor() { }
}
