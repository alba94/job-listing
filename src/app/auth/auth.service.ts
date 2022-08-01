import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData, SignUpModel } from '../core/models/user.model';
import { tap} from 'rxjs/operators';
import { loginUrl, signupUrl } from '../core/common/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  constructor(private http: HttpClient,) {
    this.url = environment.baseUrl + '/auth';
  }

  signUp(signUpModel: SignUpModel) {
    return this.http
      .post<AuthResponseData>(signupUrl, {
        displayName: signUpModel.role,
        email: signUpModel.email,
        password: signUpModel.password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          console.log('res pasi sign up', resData);
          
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
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  isAdmin() {
    console.log('user role', JSON.parse(localStorage.getItem('user')!).displayName);
    
    return JSON.parse(localStorage.getItem('user')!).displayName == 'offer';
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
