import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../service/register.service';
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
  constructor(private fb: FormBuilder, private registerservice: RegisterService, private router: Router) { }

  ngOnInit() {

    this.registerForm=this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required],
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
