import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatservice: ChatService) { }

  chatArr = [];

  ngOnInit() {
    this.chatservice.getchats().subscribe(res => {
      console.log(res);
      this.chatArr = res;
      console.log(res[0].id);
      console.log(this.chatArr);
    }, err => {
      console.log(err.message);
    });
  }
}
