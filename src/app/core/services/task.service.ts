import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobPostingEntity } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.baseUrl + '/tasks';
  }

  addTask(request: JobPostingEntity){
    return this.httpClient.post<JobPostingEntity>(this.url + '.json', request).subscribe();
  }

  getTasks(){
    return this.httpClient.get<{ [key: string]: JobPostingEntity }>(this.url + '.json').pipe(
      map((res) => {
        console.log(res);
        const tasksArray: JobPostingEntity[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            tasksArray.push({ ...res[key as keyof typeof res], id: key });
          }
        }
        return tasksArray;
      })
    );
  }

  deleteTask(id: string){
    // return this.httpClient.delete(this.url+ `/${id}`)
    return this.httpClient.delete<JobPostingEntity>(this.url +'/'+ id + '.json');
  }
}
