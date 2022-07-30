import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData, User, UserEntity } from '../core/models/user.model';
import { tap, switchMap  } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { loginUrl, signupUrl } from '../core/common/constants';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/app'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 

  private url: string;
  constructor(private http: HttpClient,) {
    this.url = environment.baseUrl + '/auth';
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(signupUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          console.log('resData ', resData);
          
          localStorage.setItem('token', resData.idToken);
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          localStorage.setItem('token', resData.idToken);
          // console.log('user email', resData.email);
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  }
}
