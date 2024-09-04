
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { ResponseBook } from '../interfaces/ResponseBook';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl: string = appsettings.apiUrl;

  constructor(private http: HttpClient) {}

  list(): Observable<ResponseBook> {
    return this.http.get<ResponseBook>(`${this.baseUrl}Books/List`);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}Books/${id}`);
  }

  addBook(book: Book, imageFile?: File): Observable<Book> {
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author ?? '');
    formData.append('description', book.description);
    formData.append('publicationDate', book.publicationDate ?? ''); 
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    return this.http.post<Book>(`${this.baseUrl}Books`, formData);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}Books/${id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Books/${id}`);
  }
}
