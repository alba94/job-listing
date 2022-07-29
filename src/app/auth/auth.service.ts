import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData, User, UserEntity } from '../core/models/user.model';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  private url: string;
  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/auth';
  }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBk65qpZOrRiQGYFpoRxf2Qv-STEsievrg',
      { email: email, 
        password: password, 
        returnSecureToken: true }
    ).pipe(tap());
  }

  login(email: string, password: string){
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBk65qpZOrRiQGYFpoRxf2Qv-STEsievrg',
      { email: email, 
        password: password, 
        returnSecureToken: true }
    );
  }

  private handleAuth(email: string, token: string, expiresIn: number){
    
  }
 
}
