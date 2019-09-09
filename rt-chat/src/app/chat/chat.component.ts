import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatservice: ChatService, private loginservice: LoginService) { }

  chatArr = [];
  allUsers: any[];
  loggedUser: string;

  ngOnInit() {
    this.chatservice.getchats().subscribe(res => {
      // console.log(res);
      this.chatArr = res;
      // console.log(res[0].id);
      // console.log(this.chatArr);
    }, err => {
      console.log(err.message);
    });

    this.loginservice.getUsers().subscribe(
      (data) => {
        // console.log(data);
        this.allUsers = data;
        for (let i = 0; i < this.allUsers.length; i++) {
          console.log(this.allUsers[i].islogged);
          if (this.allUsers[i].islogged) {
            this.loggedUser = this.allUsers[i].username;
            console.log(this.loggedUser);
            break;
          }
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}