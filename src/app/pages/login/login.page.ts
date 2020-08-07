import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email;
  password;

  constructor(private auth: AuthService, private router: Router) { }

  onLogin() {
    this.auth.signIn(this.email, this.password);
  }

  onSignUp() {
    this.router.navigateByUrl('/register');
  }

}
