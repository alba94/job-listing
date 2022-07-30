import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobPostingComponent } from './create-job-posting.component';

describe('CreateJobPostingComponent', () => {
  let component: CreateJobPostingComponent;
  let fixture: ComponentFixture<CreateJobPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
