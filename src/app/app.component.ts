import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/AuthenticationService'; import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

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

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  title = 'SEF-Predictor';
  selectedValue: string;
  bodyContent: any;
  sourceBody: any;
  themeColor: string;
  firstName: any;

  constructor(
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
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

  onTheme(color: string) {
    this.onThemeChange(color);
  }


  onThemeChange(theme: string) {
    this.bodyContent = document.getElementById('body-wrapper');
    this.sourceBody = document.getElementsByClassName('source-body');

    switch (theme) {

      case 'BLACK':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Black');
        this.sourceBody[0].style.backgroundColor = 'rgb(54, 54, 54)';
        break;
      case 'BLUE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Blue');
        this.sourceBody[0].style.backgroundColor = 'rgb(90 95 155)';
        break;
      case 'GREEN':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Green');
        this.sourceBody[0].style.backgroundColor = 'rgb(0 90 0 / 47%)';
        break;
      case 'ORANGE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Orange');
        this.sourceBody[0].style.backgroundColor = 'rgb(216 196 118)';
        break;
      case 'PINK':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Pink');
        this.sourceBody[0].style.backgroundColor = 'rgb(216 196 118)';
        break;
      case 'PURPLE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Purple');
        this.sourceBody[0].style.backgroundColor = 'rgb(216 196 118)';
        break;
      case 'RED':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Red');
        this.sourceBody[0].style.backgroundColor = 'rgb(216 196 118)';
        break;
      case 'WHITE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-White');
        this.sourceBody[0].style.backgroundColor = 'rgb(216 196 118)';
        break;
      case 'YELLOW':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Yellow');
        this.sourceBody[0].style.backgroundColor = 'rgb(216 196 118)';
        break;
      default:
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Black');
        break;
    }
  }

  logout() {
    this.authenticationService.SignOut();
  }
}
