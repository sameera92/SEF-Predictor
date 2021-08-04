
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app"
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { promise } from 'protractor';
@Injectable({
    providedIn: 'root',
  })
export class AuthenticationService {
   // userData: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth,private _router: Router, private _snackBar: MatSnackBar) {
        const userData = angularFireAuth.authState;
    }

    /* Sign up */
   async SignUp(email: string, password: string,name=''):Promise<any>{
        this.angularFireAuth
            .createUserWithEmailAndPassword(email, password)
           
    }

    /* Sign in */
    async SignIn(email: string, password: string):Promise<any>{
        this.angularFireAuth
            .signInWithEmailAndPassword(email, password)
           
    }

    /* Sign out */
    SignOut() {
        this.angularFireAuth
            .signOut();
    }
}
