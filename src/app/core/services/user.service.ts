import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, pipe } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { environment } from 'src/environments/environment';
import { JobPostingEntity } from '../models/job.model';
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
    // return this.http.get<UserEntity>(this.url + '.json')
    return this.http
      .get<{ [key: string]: UserEntity}>(this.url + '.json', {
        params: new HttpParams().set('auth', localStorage.getItem('token')!),
      })
      .pipe(
        map((res) => {
          // console.log('res ne getJobs', res);
          const jobsArray: UserEntity[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              jobsArray.push({ ...res[key as keyof typeof res], id: key });
            }
          }
          return jobsArray;
          // console.log('user ',jobsArray);
        })
      );
  }

  updateUser(request: UserEntity) {
    return this.http
      .patch<UserEntity>(this.url + `/${request.id}` + '.json', request)
      .subscribe(res => {
        // console.log('res i updateUser', res);
      });
  }

  editUser(request: UserEntity) {
    return this.http
      .put<UserEntity>(this.url + `/${request.id}` + '.json', request)
      .subscribe(res => {
        console.log('service edit', res);
      });
  }

}
