import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { passwordRegex } from 'src/app/core/common/constants';
import { AuthResponseData } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    });
  }

  ngOnInit(): void {}

  logIn() {
    let authObs: Observable<AuthResponseData>;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.isLoading = false;
        if (res.displayName == 'offer') {
          this.router.navigate(['/dashboard']);
        } else if (res.displayName == 'seeker') {
          this.router.navigate(['/home']);
        }
      });
    this.loginForm.reset();
  }
}
