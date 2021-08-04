import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private _router: Router, private authenticationService: AuthenticationService, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.setItem("name", JSON.stringify(''));
  }

  onSubmitRegister() {
    this.email = this.form.controls['email'].value;
    this.password = this.form.controls['password'].value;
    this.firstname = this.form.controls['firstname'].value;
    this.signUp();
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password,this.firstname);
  }

}
