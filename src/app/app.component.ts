import { Component } from '@angular/core';
import { AuthenticationService } from './services/AuthenticationService';
interface Color {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SEF-Predictor';
  constructor(){
    }

}
