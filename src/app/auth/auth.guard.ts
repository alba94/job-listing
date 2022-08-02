import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
