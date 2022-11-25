import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/users/';
const API_URL2 = 'http://localhost:8081/api/books/'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(API_URL + 'allUsers');
  }

  getUserDetails(id:number): Observable<any> {
    return this.http.get(API_URL + `user/${id}`);
  }
  upload(file: File,data:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('Books',data);

    const req = new HttpRequest('POST', `${API_URL2}uploadBook`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  }
  /*getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }*/


