import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService} from 'src/app/auth/auth.service';
import { AuthResponseData } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        // Validators.pattern(passwordRegex),
      ]),
    });
   }

  ngOnInit(): void {
  }

  login(){
    let authObs: Observable<AuthResponseData>;
    this.authService
    .login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  this.loginForm.reset();
  }

}
