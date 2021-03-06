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
  selectedValue: string;
  bodyContent: any;
  sourceBody: any;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.bodyContent = document.getElementById('body-wrapper');
    this.bodyContent.className = "";
    this.bodyContent.classList.add('Theme-Black');
    this.sourceBody = document.getElementsByClassName('source-body');
    this.sourceBody[0].style.backgroundColor = '#363636';
  }

  colors: Color[] = [
    { value: 'BLACK', viewValue: 'Black' },
    { value: 'BLUE', viewValue: 'Blue' },
    { value: 'YELLOW', viewValue: 'Yellow' }
  ];

  onThemeChange(theme: string) {
    this.bodyContent = document.getElementById('body-wrapper');
    this.sourceBody = document.getElementsByClassName('source-body');

    switch (theme) {

      case 'BLACK':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Black');
        this.sourceBody[0].style.backgroundColor = '#363636';
        break;
      case 'BLUE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Blue');
        this.sourceBody[0].style.backgroundColor = '#969be0';
        break;
      case 'YELLOW':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Yellow');
        this.sourceBody[0].style.backgroundColor = '#ffffaa';
        break;
      default:
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Black');
        break;
    }
  }
}
