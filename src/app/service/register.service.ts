import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  
  port = process.env.PORT || 3000;

  registerUrl: string=`http://localhost:${this.port}/api/userTable`;

  regUser(user):Observable<any>{
    return this.http.post(this.registerUrl, user);
  }
}
