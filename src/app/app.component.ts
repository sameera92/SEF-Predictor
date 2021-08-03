import { Component } from '@angular/core';
import { AuthenticationService } from './services/AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email: string='';
  password: string='';
  title = 'SEF-Predictor';
  constructor(
    private authenticationService:AuthenticationService
    ){
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
