import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { passwordRegex } from 'src/app/core/common/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    });
  }

  logIn() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log('user in localStorage', res);
          if (res.displayName == 'offer') {
            this.router.navigate(['/dashboard']);
          } else if (res.displayName == 'seeker') {
            this.router.navigate(['/home']);
          }
          localStorage.setItem('user', JSON.stringify(res));
        },
        error: () => {
          this.isLoading = false;
          this.showError('Icorrect credentials');
        },
      });
    this.loginForm.reset();
  }

  showError(errorMsg: string) {
    this.messageService.add({
      key: 'loginToast',
      severity: 'error',
      summary: 'Error',
      detail: errorMsg,
    });
  }
}
