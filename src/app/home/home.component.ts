import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { JobPostingEntity } from '../core/models/job.model';
import { UserEntity } from '../core/models/user.model';
import { JobService } from '../core/services/job.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isFetching: boolean = false;
  currentUser: UserEntity = JSON.parse(localStorage.getItem('user')!);
  loggedUser: UserEntity = {
    id: ' ',
    email: ' ',
    displayName: ' ',
    favoriteJobs: [],
    appliedJobs: [],
  };
  jobs: JobPostingEntity[] = [];
  enteredSearchValue: string = '';
  items: MenuItem[] = [];
  favoriteJobs: JobPostingEntity[] = [];
  checked: boolean = true;

  constructor(
    private jobService: JobService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('user ', this.currentUser);
    
    this.fetchJobs();
    this.getUser();
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

  getUser() {
    this.userService.getUser().subscribe((users) => {
      for (let user in users) {
        if (users[user].email == this.currentUser.email) {
          this.loggedUser = users[user];
        }
      }
    });
  }

  fetchJobs() {
    this.isFetching = true;
    this.jobService.getJobs().subscribe((jobs) => {
      this.isFetching = false;
      this.jobs = jobs;
      for (let job in this.jobs) {
        if (this.jobs[job].wage == undefined) {
          this.jobs[job].wage = 'Not available';
        }
      }
    });
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
