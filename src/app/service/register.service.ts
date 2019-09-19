import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  registerUrl: string=`/api/userTable`;

  regUser(user):Observable<any>{
    return this.http.post(this.registerUrl, user);
  }
}
