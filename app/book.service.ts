import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseURL="http://localhost:8081/api/books/book";

  constructor(private httpClient: HttpClient) { }

  getBookById(id:number):Observable<Book>
  {
    return this.httpClient.get<Book>(`${this.baseURL}/${id}`);
  }


   updateBook(id: number, book: Book): Observable<Object>
   {
    return this.httpClient.put(`${this.baseURL}/${id}`, book);
   }
  
}
