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
  allLoggedUsers: any[];
  loggedUser: string;
  chatbody;

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
        this.loggedUser = sessionStorage.getItem("loggedUser");
        this.allLoggedUsers = data.filter(function (user) {
          return user.islogged == 'true';
        });
        // console.log(this.allLoggedUsers);
        // console.log(this.loggedUser);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  onSubmit(val) {
    // console.log(val);
    this.chatbody = {
      "username": this.loggedUser,
      "msg": val
    };
    // console.log(this.chatbody);
    this.chatservice.uploadchats(this.chatbody).subscribe(res => {
      // console.log(res);
      // this.chatArr = res;
      // console.log(res[0].id);
      // console.log(this.chatArr);
    }, err => {
      console.log(err.message);
    });
  }

  sendMessageOnEnter($event, messagebox) {
    if ($event.which === 13) { // ENTER_KEY
        this.onSubmit(messagebox);
    }
}
}