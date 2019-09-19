import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  port = process.env.PORT || 3000;
  userUrl:string=`/api/userTable`;
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return <Observable<any>> this.http.get(this.userUrl);
  }

  updateUser(id: number, attrib: Object):Observable<any>{
    return <Observable<any>> this.http.patch(this.userUrl+"/"+id, attrib);
  }
}