import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
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
  currentUser = JSON.parse(localStorage.getItem('user')!);
  display: boolean = false;
  openEdit: boolean = false;
  openModal: boolean = false;
  selectedJobPost!: JobPostingEntity;

  @Output() searchTextChanged: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private jobService: JobService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    this.newJob = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      offer: new FormControl(this.currentUser, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fetchJobs();
    for (let job in this.jobs) {
      console.log('jobs ', this.jobs[job].offer);
      if (this.jobs[job].offer == this.currentUser) {
        console.log('stacieee', this.jobs[job]);
      }
    }
  }

  fetchJobs() {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs.filter((job) => {
       return job.offer.email == this.currentUser.email;
      });
    });
  }

  createJob(job: JobPostingEntity) {
    this.jobService.addJob(job);
    this.jobs.unshift(job);
  }

  updateJob(job: JobPostingEntity) {
    this.jobService.updateJob(job);
  }

  deleteJob(job: JobPostingEntity) {
    this.jobService.deleteJob(job.id).subscribe((item) => {
      this.jobs = this.jobs.filter((item) => item.id != job.id);
    });
  }

  confirm(job: JobPostingEntity) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.deleteJob(job);
      },
    });
  }

  editJob(job: JobPostingEntity) {
    this.display = true;
    this.openEdit = true;
    this.selectedJobPost = job;
    this.jobService.editJob(job);
  }

  handleJob(event: JobPostingEntity) {
    console.log(event);
    if (!this.openEdit) {
      this.createJob(event);
    } else {
      this.editJob(event);
    }
  }

  showModal(value: boolean) {
    this.openModal = value;
    this.display = value;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    console.log('event', $event.target.value);

    this.dt!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  showDialog() {
    this.display = true;
  }
}
