
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app"
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root',
  })
export class AuthenticationService {
   // userData: Observable<firebase.User>;
   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private angularFireAuth: AngularFireAuth,private _router: Router, private _snackBar: MatSnackBar) {
        const userData = angularFireAuth.authState;
    }

    /* Sign up */
    SignUp(email: string, password: string,name='') {
        this.angularFireAuth
            .createUserWithEmailAndPassword(email, password)
            .then((res: any) => {
                this._snackBar.open('Successfully Registerd', 'Close', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                this._router.navigate(['/login']);
                localStorage.setItem("name", JSON.stringify('Hi ' + name));
            })
            .catch((error: { message: any; }) => {
                this._snackBar.open(error.message, 'Close', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
            });
    }

    /* Sign in */
    SignIn(email: string, password: string) {
        this.angularFireAuth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this._snackBar.open('Successfully Signed in', 'Close', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                this._router.navigate(['/dashboard']);
})
            .catch((err: { message: any; }) => {
                this._snackBar.open(err.message, 'Close', {
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                console.log("Something went wrong:", err.message);
            });
    }

    /* Sign out */
    SignOut() {
        this.angularFireAuth
            .signOut();
    }
}
