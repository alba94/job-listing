import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { JobPostingEntity } from '../core/models/job.model';
import { UserEntity } from '../core/models/user.model';
import { JobService } from '../core/services/job.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isFetching: boolean = false;
  currentUser: UserEntity = JSON.parse(localStorage.getItem('user')!);
  jobs: JobPostingEntity[] = [];
  enteredSearchValue: string = '';
  items!: MenuItem[];
  favoriteJobs: JobPostingEntity[] = [];

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.fetchJobs();
    this.items = [
      {
        icon: 'pi pi-user',
        label: 'Profile',
        routerLink: ['/profile'],
      },
      {
        icon: 'pi pi-sign-out',
        label: 'Log Out',
        command: (e) => {
          this.logOut();
        },
      },
    ];
  }

  fetchJobs() {
    this.isFetching = true;
    this.jobService.getJobs().subscribe((jobs) => {
      this.isFetching = false;
      this.jobs = jobs;
    });
  }

  saveFavorites(favoriteJob: JobPostingEntity) {
    // this.favoriteJobs.push(favoriteJob);
    // console.log(this.favoriteJobs);
  }

  isFavorite(isFav: boolean) {
    if (isFav) {
      // this.saveFavorites()
    }
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
