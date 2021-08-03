
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from "firebase/app"
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
  })
export class AuthenticationService {
   // userData: Observable<firebase.User>;

    constructor(private angularFireAuth: AngularFireAuth) {
        const userData = angularFireAuth.authState;
    }

    /* Sign up */
    SignUp(email: string, password: string) {
        this.angularFireAuth
            .createUserWithEmailAndPassword(email, password)
            .then((res: any) => {
                console.log('You are Successfully signed up!', res);
            })
            .catch((error: { message: any; }) => {
                console.log('Something is wrong:', error.message);
            });
    }

    /* Sign in */
    SignIn(email: string, password: string) {
        this.angularFireAuth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("You're in !");
})
            .catch((err: { message: any; }) => {
                console.log("Something went wrong:", err.message);
            });
    }

    /* Sign out */
    SignOut() {
        this.angularFireAuth
            .signOut();
    }
}
