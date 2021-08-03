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
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  email: string;
  password: string;

  constructor(private fb: FormBuilder, private _router: Router,private authenticationService:AuthenticationService) {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> { }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.email = this.form.get('username')?.value;
        this.password = this.form.get('password')?.value;
        //await this.authService.login(username, password);
        this.signIn()
        this._router.navigate(['/dashboard']);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  signUp() {
    this.authenticationService.SignUp(this.email, this.password);
    this.email = 'sameeralaknath@gmail.com';
    this.password = 'asas@123';
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
    this.email = 'admin@gmail.com';
    this.password = 'adamin@123';
  }

  signOut() {
    this.authenticationService.SignOut();
  }
}
