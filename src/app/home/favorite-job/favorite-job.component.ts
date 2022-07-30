import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-job',
  template: `<i (click)="favoriteJob()" [ngClass]="isFavorite ? 'pi pi-heart-fill likeButton' : 'pi pi-heart'"></i>`,
  styleUrls: ['./favorite-job.component.scss'],
})
export class FavoriteJobComponent implements OnInit {
  isFavorite: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  favoriteJob(){
    this.isFavorite = !this.isFavorite;
  }
}
