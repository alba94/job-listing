import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { passwordRegex } from 'src/app/core/common/constants';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  signupForm: FormGroup;
  selectedPosition: string = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      role: new FormControl([Validators.required]),
    });
  }

  ngOnInit(): void {}

  signUp() {
    let userName =
      this.signupForm.value.firstname + ' ' + this.signupForm.value.lastname;
    this.isLoading = true;
    this.authService
      .signUp({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role: this.signupForm.value.role,
      })
      .subscribe(
        (res) => {
          this.userService.addUser({
            id: res.idToken,
            email: res.email,
            displayName: userName,
            favoriteJobs: [],
            appliedJobs: [],
          });
          localStorage.setItem('user', JSON.stringify(res));
          this.isLoading = false;
          if (res.displayName == 'offer') {
            this.router.navigate(['/dashboard']);
          } else if (res.displayName == 'seeker') {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.isLoading = false;
          this.showError('Email has already been taken');
        }
      );
    this.signupForm.reset();
  }

  showError(errorMsg: string) {
    this.messageService.add({
      key: 'signupToast',
      severity: 'error',
      summary: 'Error',
      detail: errorMsg,
    });
  }
}
