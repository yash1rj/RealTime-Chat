import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatservice: ChatService, private loginservice: LoginService, private router: Router) { }

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

    // this.loginservice.getUsers().subscribe(
    //   (data) => {
    //     // console.log(data);
    //     this.loggedUser = sessionStorage.getItem("loggedUser");
    //     this.allUsers = data;
    //     this.allLoggedUsers = data.filter(function (user) {
    //       return user.islogged == 'true';
    //     });
    //     // console.log(this.allLoggedUsers);
    //     // console.log(this.loggedUser);
    //   },
    //   (error) => {
    //     console.log(error.message);
    //   }
    // );

  interval(5000)
    .pipe(
      startWith(0),
      switchMap(() => this.loginservice.getUsers())
    )
    .subscribe(
      (data) => {
        // console.log(data);
        this.loggedUser = sessionStorage.getItem("loggedUser");
        this.allUsers = data;
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
      this.chatArr.push(res);
      // console.log(res[0].id);
      // console.log(this.chatArr);
    }, err => {
      console.log(err.message);
    });
  }

  sendMessageOnEnter(messagebox) {
    this.onSubmit(messagebox);
  }

  logOut() {
    sessionStorage.removeItem("loggedUser");
    // console.log(this.allLoggedUsers)

    for (let i = 0; i < this.allUsers.length; i++) {
      if (this.loggedUser === this.allUsers[i].username) {
        this.allUsers[i].islogged = "false";
        // console.log(this.allUsers);
        
        this.loginservice.updateUser(i+1, { "islogged": "false" }).subscribe(
          (data) => {
            // console.log(data);
          },
          (error) => {
            console.log(error.message);
          }
        );
        
      }
    }
    this.router.navigate(['login']);
  }
}