import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { JobPostingEntity } from '../core/models/job.model';
import { UserEntity } from '../core/models/user.model';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('user')!);
  jobs: JobPostingEntity[] = [];
  favoriteJobs: JobPostingEntity[] = [];
  appliedJobs: JobPostingEntity[] = [];
  user!: UserEntity;
  items: MenuItem[] = [];
  checked: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFavoriteByUser();
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

  getFavoriteByUser() {
    this.userService.getUser().subscribe((users) => {
      for (let user in users) {
        if (users[user].email == this.currentUser.email) {
          this.user = users[user];
          this.favoriteJobs = this.user.favoriteJobs;
          console.log('fav jobs', this.favoriteJobs);
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
