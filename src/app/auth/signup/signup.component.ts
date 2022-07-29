import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      firstname: new FormControl(null),
      lastname: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        // Validators.pattern('^(?=.*d)(?=.*[a-zA-Z]).{8,16}$'),
      ]),
    });
  }

  ngOnInit(): void {}

  signup() {
    this.authService
      .signup(this.signupForm.value.email, this.signupForm.value.password)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    this.signupForm.reset();
  }
}
