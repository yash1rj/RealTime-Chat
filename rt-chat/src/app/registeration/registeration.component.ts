import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { Validations } from '../validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  registerForm: FormGroup;
  regbody: object;
  islogged: boolean;
  passworderrormsg: string = "Please enter 8-18 characters. Password should include at least 1 small letter, 1 capital letter and a number";
  emailerrormsg: string = "Please enter valid email Id.";
  usernameerrormsg: string = "Username required with atleast 3 characters";
  nameerrormsg: string = "Name required with atleast 3 characters";
  constructor(private fb: FormBuilder, private registerservice: RegisterService, private router: Router, private loginvalidator: Validations) { }

  ngOnInit() {

    this.registerForm=this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.loginvalidator.validateLogin]],
      islogged: ['false']
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.regbody = this.registerForm.value;
    console.log(this.regbody);
    this.registerservice.regUser(this.regbody).subscribe(
        (data)  => {
          console.log("POST Request is successful ", data);
          this.registerForm.reset();
          this.router.navigate(['login']);
          // this.registerservice.regSuccess(); 
        },
        (error)  => {
          console.log("Error", error);
        }
      );
  }
}
