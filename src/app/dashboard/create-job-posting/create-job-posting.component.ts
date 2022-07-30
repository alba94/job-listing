import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobPostingEntity } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-create-job-posting',
  templateUrl: './create-job-posting.component.html',
  styleUrls: ['./create-job-posting.component.scss']
})
export class CreateJobPostingComponent implements OnInit {
  newJob: FormGroup;
  display: boolean = false;
  // @Input() jobDetails!: JobPostingEntity 

  @Output() addedJob = new EventEmitter<JobPostingEntity>();

  constructor(private jobService: JobService) { 
    this.newJob = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  createJob() {
    console.log(this.newJob.value);
    this.jobService.addJob(this.newJob.value);
    this.addedJob.emit(this.newJob.value);
  }

  showDialog(){
    this.display = true;
  }
}
