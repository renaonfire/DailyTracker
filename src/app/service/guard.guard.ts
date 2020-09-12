import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router, public authService: AuthService) {}

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
