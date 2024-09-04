
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { appsettings } from '../settings/appsettings';
import { Quote } from '../interfaces/Quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}Quotes/List`);
  }

  addQuote(quote: Quote): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Quotes/`, quote);
  }

  deleteQuote(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}Quotes/${id}`);
  }
  
}



