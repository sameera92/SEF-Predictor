import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from './services/AuthenticationService'; import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataService } from './services/dataService';

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
  ) { }

  ngOnInit() {
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
        // this.sourceBody[0].style.backgroundColor = 'rgb(72 72 72)';
        break;
      case 'BLUE':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Blue');
        // this.sourceBody[0].style.backgroundColor = '#969be0';
        break;
      case 'YELLOW':
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Yellow');
        // this.sourceBody[0].style.backgroundColor = '#ffffaa';
        break;
      default:
        this.bodyContent.className = "";
        this.bodyContent.classList.add('Theme-Black');
        break;
    }
  }

  logout(){
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
