// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Client } from '../interfaces/Client';
// import { appsettings } from '../settings/appsettings';
// import { ResponseAccess } from '../interfaces/ResponseAccess';
// import { Login } from '../interfaces/Login';

// @Injectable({
//   providedIn: 'root'
// })
// export class AccessService {
//   private http = inject(HttpClient)
//   private baseUrl:string = appsettings.apiUrl

//   constructor() { }

//   register(objeto:Client):Observable<ResponseAccess>{
//     return this.http.post<ResponseAccess>(`${this.baseUrl}Access/Register`,objeto)
//   }
//   login(objeto:Login):Observable<ResponseAccess>{
//     return this.http.post<ResponseAccess>(`${this.baseUrl}Access/Login`,objeto)
//   }
//   signOut(): Observable<{ isSuccess: boolean }> {
//     return this.http.post<{ isSuccess: boolean }>(`${this.baseUrl}Access/SignOut`, {});
//   }
// }
