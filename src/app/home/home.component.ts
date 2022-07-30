import { Component, OnInit } from '@angular/core';
import { JobPostingEntity } from '../core/models/job.model';
import { JobService } from '../core/services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isFetching: boolean = false;

  jobs: JobPostingEntity[] = [];
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.isFetching = true;
    this.jobService.getJobs().subscribe((jobs) => {
      this.isFetching = false;
      this.jobs = jobs;
    });
  }

  
}
