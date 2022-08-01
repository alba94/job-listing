import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { JobPostingEntity } from 'src/app/core/models/job.model';
import { UserClass, UserEntity } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

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
  @Input() job!: JobPostingEntity;
  user!: UserEntity;
  currentUser = JSON.parse(localStorage.getItem('user')!);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getFavoriteByUser();
  }

  getFavoriteByUser() {
    this.userService.getUser().subscribe((users) => {
      for (let user in users) {
        if (users[user].email == this.currentUser.email) {
          this.user = users[user];
          for (let job in this.user.favoriteJobs) {
            if (this.user.favoriteJobs[job].id == this.job.id) {
              this.isFavorite = true; 
            } else if (this.user.favoriteJobs[job].id == this.job.id){
              this.isFavorite = false; 
            }
          }
        }
      }
    });
  }

  favorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite == true) {
      if (this.user.favoriteJobs && this.user.favoriteJobs.length >0) {
        this.user.favoriteJobs.push(this.job);
        console.log('user favorite jobs pas push, ', this.user.favoriteJobs);
        this.userService.updateUser(this.user);
      } else if (this.user.favoriteJobs == undefined) {
        this.user.favoriteJobs = [];
        this.user.favoriteJobs.push(this.job);
        this.userService.updateUser(this.user);
      }
    } else if(this.isFavorite == false) {
      if (this.user.favoriteJobs && this.user.favoriteJobs.length > 0) {
        console.log('Delete ', this.user.favoriteJobs);
        for (let job in this.user.favoriteJobs) {
          // if (this.user.favoriteJobs[job].id == this.job.id) {
            // this.job = this.user.favoriteJobs[job];
            console.log('jobs 2', this.user.favoriteJobs[job]);
            
            this.user.favoriteJobs = this.user.favoriteJobs.filter((jobs)=>{
              console.log('jobs', jobs);
              
            })
            // const index = this.user.favoriteJobs.indexOf(this.job);
            // console.log('index', index);
            
            //   this.user.favoriteJobs.splice(index, 1);
            //   console.log('job qe fshihet ', this.job);
            // this.userService.editUser(this.user);
          // } 
        }
        
      } else console.log('array eshte bosh ');
    }
  }
}
