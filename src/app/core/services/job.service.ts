import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { environment } from 'src/environments/environment';
import { JobPostingEntity } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private url: string;

  constructor(private httpClient: HttpClient, private sortPipe: SortPipe) {
    this.url = environment.baseUrl + '/jobs';
  }

  addJob(request: JobPostingEntity) {
    return this.httpClient
      .post<JobPostingEntity>(this.url + '.json', request)
      .subscribe();
  }

  editJob(request: JobPostingEntity) {
    return this.httpClient
      .put<JobPostingEntity>(this.url + `/${request.id}` + '.json', request)
      .subscribe();
  }

  updateJob(request: JobPostingEntity) {
    return this.httpClient
      .patch<JobPostingEntity>(
        this.url + `/${request.id}` + '.json',
        request.wage
      )
      .subscribe();
  }

  getJobs() {
    return this.httpClient
      .get<{ [key: string]: JobPostingEntity }>(this.url + '.json', {
        params: new HttpParams().set('auth', localStorage.getItem('token')!),
      })
      .pipe(
        map((res) => {
          const jobsArray: JobPostingEntity[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              jobsArray.push({ ...res[key as keyof typeof res], id: key });
            }
          }
          return this.sortPipe.transform(jobsArray);
        })
      );
  }

  deleteJob(id: string) {
    return this.httpClient.delete<JobPostingEntity>(
      this.url + '/' + id + '.json'
    );
  }
}
