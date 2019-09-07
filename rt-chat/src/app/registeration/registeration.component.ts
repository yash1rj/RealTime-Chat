import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.registerForm=this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
