import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  chatUrl: string="http://localhost:3000/chatTable";

  getchats():Observable<any>{
    return this.http.get(this.chatUrl);
  }

}