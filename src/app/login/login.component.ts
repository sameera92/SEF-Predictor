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

  async ngOnInit(): Promise<void> {
    localStorage.setItem("name", JSON.stringify(''));
   }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        this.email = this.form.controls['username'].value;
        this.password = this.form.controls['password'].value;
        //await this.authService.login(username, password);
        this.signIn()
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  signIn() {
    this.authenticationService.SignIn(this.email, this.password);
  }

  signOut() {
    this.authenticationService.SignOut();
  }

  goToRegisterPage() {
    this._router.navigate(['/register']);
  }
}
