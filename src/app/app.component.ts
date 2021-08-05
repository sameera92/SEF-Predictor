import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './services/AuthenticationService'; import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataService } from './services/dataService';
import { LoaderService } from './services/loaderService';

interface Color {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class AppComponent {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  title = 'SEF-Predictor';
  selectedValue: string;
  bodyContent: any;
  sourceBody: any;
  themeColor: string;
  firstName: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds:number = 2;
  loggedIn:boolean;
  constructor(
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private datService:DataService,
    private loader:LoaderService,
  ) { }

  ngOnInit() {
    this.loader.hideLoader();
    this.datService.currentLogedIn.subscribe(data =>{ 
      if(data){
        this.loggedIn =  true;
      }else{
        this.loggedIn =  false;
      }
    })
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
        this.sourceBody[0].style.backgroundColor = 'rgb(18 21 69 / 43%)';
        break;
      case 'GREEN':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Green');
        this.sourceBody[0].style.backgroundColor = 'rgb(0 90 0 / 47%)';
        break;
      case 'ORANGE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Orange');
        this.sourceBody[0].style.backgroundColor = 'rgb(255 165 0 / 38%)';
        break;
      case 'PINK':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Pink');
        this.sourceBody[0].style.backgroundColor = 'rgb(255 103 130 / 47%)';
        break;
      case 'PURPLE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Purple');
        this.sourceBody[0].style.backgroundColor = 'rgb(128 0 128 / 34%)';
        break;
      case 'RED':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Red');
        this.sourceBody[0].style.backgroundColor = 'rgb(150 47 46 / 87%)';
        break;
      case 'LIGHT-BLUE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Light-Blue');
        this.sourceBody[0].style.backgroundColor = '#20808c73';
        break;
      case 'YELLOW':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Yellow');
        this.sourceBody[0].style.backgroundColor = 'rgb(230 219 69 / 61%)';
        break;
      default:
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Black');
        break;
    }
  }

  logout() {
    this.authenticationService.SignOut();
    this._router.navigate(['/login']);
    this.datService.changeLogedInStatus(false);
    this._snackBar.open('Successfully Logged out', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 2000,
      panelClass: "success-dialog"
    });
  }
}
