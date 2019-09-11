import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Validations } from '../validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginbody;
  loginCondition: boolean;
  allUsers: any[];
  passworderrormsg: string = "Please enter 8-18 characters. Password should include at least 1 small letter, 1 capital letter and a number";
  emailerrormsg: string = "Please enter valid email Id.";
  loginerrormsg: string = "Please try logging-in with correct credentials else Register with us."
  constructor(private fb: FormBuilder, private loginservice: LoginService, private loginvalidator: Validations, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.loginvalidator.validateLogin]]
    });

    this.loginservice.getUsers().subscribe(
      (data) => {
        // console.log(data);
        this.allUsers = data;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.loginbody = this.loginForm.value;
    // console.log(this.loginbody);
    for (let i = 0; i < this.allUsers.length; i++) {
      if ((this.loginbody.emailId === this.allUsers[i].emailId) && (this.loginbody.password === this.allUsers[i].password)) {
        this.loginCondition = true;
        this.allUsers[i].islogged = "true";
        // console.log(this.allUsers);

        this.loginservice.updateUser(i+1, { "islogged": "true" }).subscribe(
          (data) => {
            // console.log(this.allUsers[i].username);
            sessionStorage.setItem("loggedUser", this.allUsers[i].username)
          },
          (error) => {
            console.log(error.message);
          }
        );
        this.router.navigate(['chatroom']);
      }
      else {
        this.loginCondition = false;
      }

    }
  }
}