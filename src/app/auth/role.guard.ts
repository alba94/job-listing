import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean {
    if(this.authService.loggedIn() && this.authService.isAdmin()){
          return true;
        } else {
         this.router.navigate(['/home']);
         return false;
        }
  }

  // boolean {
  //   if(this.authService.loggedIn() && this.authService.isAdmin()){
  //     return true;
  //   } else {
  //    this.router.navigate(['/home']);
  //    return false;
  //   }
  // }
}