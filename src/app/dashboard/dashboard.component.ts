import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { JobPostingEntity } from '../core/models/task.model';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newTask: FormGroup;
  tasks: JobPostingEntity[] = [];
  isFetching: boolean = false;

  constructor(private http: HttpClient, private taskService: TaskService) {
    this.newTask = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fetchTasks();
  }

  createTask() {
    console.log(this.newTask.value);
    this.taskService.addTask(this.newTask.value);
  }

  fetchTasks() {
    this.isFetching = true;
    this.taskService.getTasks().subscribe((tasks) => {
      this.isFetching = false;
      this.tasks = tasks;
    });
  }

  deleteTask(task: JobPostingEntity) {
    this.taskService.deleteTask(task.id).subscribe(()=>{
      // this.tasks = [];
    });
  }
}
