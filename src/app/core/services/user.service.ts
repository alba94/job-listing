import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEntity } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl + '/users';
  }

  addUser(request: UserEntity) {
    return this.http.post<UserEntity>(this.url + '.json', request).subscribe();
  }

  getUser() {
    return this.http
      .get<{ [key: string]: UserEntity }>(this.url + '.json', {
        params: new HttpParams().set('auth', localStorage.getItem('token')!),
      })
      .pipe(
        map((res) => {
          const usersArray: UserEntity[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              usersArray.push({ ...res[key as keyof typeof res], id: key });
            }
          }
          return usersArray;
        })
      );
  }

  updateUser(request: UserEntity) {
    return this.http
      .patch<UserEntity>(this.url + `/${request.id}` + '.json', request)
      .subscribe();
  }

  editUser(request: UserEntity) {
    return this.http
      .put<UserEntity>(this.url + `/${request.id}` + '.json', request)
      .subscribe();
  }
}
