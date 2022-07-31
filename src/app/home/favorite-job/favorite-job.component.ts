import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { JobPostingEntity } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-favorite-job',
  template: `<i
    (click)="favorite()"
    [ngClass]="isFavorite ? 'pi pi-heart-fill likeButton' : 'pi pi-heart'"
  ></i>`,
  styleUrls: ['./favorite-job.component.scss'],
})
export class FavoriteJobComponent implements OnInit {
  isFavorite: boolean = false;
  // @Output() favoriteJob: EventEmitter<JobPostingEntity> =
  //   new EventEmitter<JobPostingEntity>();
  // @Output() isFav: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() job!: JobPostingEntity;

  favoriteJobs: JobPostingEntity[] = [];

  currentUser = JSON.parse(localStorage.getItem('user')!);

  constructor(private jobService: JobService) {}

  ngOnInit(): void {}

  favorite() {
    this.isFavorite = !this.isFavorite;
    // this.job.favoritedBy = [this.currentUser];
    // this.jobService.editJob(this.job);
    // console.log(this.job);
  
    // this.favoriteJob.emit(this.job);
    if (this.isFavorite == true) {
      this.job.favoritedBy?.push(this.currentUser)
      console.log(this.job.favoritedBy);
      
    } else {
      this.job.favoritedBy?.pop()
      console.log(this.job.favoritedBy);
    }
  }
 
}
