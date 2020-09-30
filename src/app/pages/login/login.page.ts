import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email;
  password;

  constructor(private auth: AuthService, private router: Router, private loc: Location ) {
    if (this.auth.isAuthenticated()) {
      console.log('isauth');
      this.loc.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigateByUrl('main/home');
    }
  }

  onLogin() {
    this.auth.generateSecureKey(this.password);
    this.auth.signIn(this.email, this.password);
  }

  onSignUp() {
    this.router.navigateByUrl('/register');
  }

}
