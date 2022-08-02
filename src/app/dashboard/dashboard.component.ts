import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { JobPostingEntity } from '../core/models/job.model';
import { UserEntity } from '../core/models/user.model';
import { JobService } from '../core/services/job.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  newJobForm: FormGroup;
  jobs: JobPostingEntity[] = [];
  currentUser = JSON.parse(localStorage.getItem('user')!);
  display: boolean = false;
  openEdit: boolean = false;
  openModal: boolean = false;
  selectedJobPost!: JobPostingEntity;
  loggedUser!: UserEntity;

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private jobService: JobService,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) {
    this.newJobForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      offer: new FormControl(this.currentUser, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fetchJobs();
    console.log('currentuser ne dashboard', this.currentUser);
  }

  fetchJobs() {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs.filter((job) => {
        if (this.currentUser.email) {
          job.offer.email == this.currentUser.email;
        }
      });
    });
  }

  createJob(job: JobPostingEntity) {
    this.jobService.addJob(job);
    this.jobs.unshift(job);
  }

  deleteJob(job: JobPostingEntity) {
    this.jobService.deleteJob(job.id).subscribe((item) => {
      this.jobs = this.jobs.filter((item) => item.id != job.id);
    });
  }

  confirm(job: JobPostingEntity) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this job posting?',
      accept: () => {
        this.deleteJob(job);
      },
    });
  }

  editJob(job: JobPostingEntity) {
    //TO FIX - change UI of edit
    this.display = true;
    this.openEdit = true;
    this.selectedJobPost = job;
    this.jobService.editJob(job);
    // this.openEdit = false;
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
