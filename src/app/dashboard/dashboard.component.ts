import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { JobPostingEntity } from '../core/models/job.model';
import { JobService } from '../core/services/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newJob: FormGroup;
  jobs: JobPostingEntity[] = [];
  isFetching: boolean = false;
  user = JSON.parse(localStorage.getItem('user')!);

  enteredSearchValue: string = '';
  @Output() searchTextChanged: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private http: HttpClient,
    private jobService: JobService,
    private afAuth: AngularFireAuth
  ) {
    this.newJob = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fetchJobs();
  }

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredSearchValue);
  }

  createJob(job: JobPostingEntity) {
    console.log(this.newJob.value);
    this.jobs.push(job);
  }

  fetchJobs() {
    this.isFetching = true;
    this.jobService.getJobs().subscribe((jobs) => {
      this.isFetching = false;
      this.jobs = jobs;
    });
  }

  deleteJob(job: JobPostingEntity) {
    this.jobService.deleteJob(job.id).subscribe(() => {
      // this.tasks = [];
    });
  }

  editJob(job: JobPostingEntity) {}

  applyFilterGlobal($event: any, stringVal: any) {
    console.log('event', $event.target.value);
    
    this.dt!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }

  logout() {
    this.afAuth.signOut();
  }
}
