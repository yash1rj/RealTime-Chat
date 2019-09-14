import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  port = process.env.PORT || 3000;
  chatUrl: string=`http://localhost:${this.port}/api/chatTable`;

  getchats():Observable<any>{
    return this.http.get(this.chatUrl);
  }

  uploadchats(data):Observable<any>{
    return this.http.post(this.chatUrl, data);
  }

}