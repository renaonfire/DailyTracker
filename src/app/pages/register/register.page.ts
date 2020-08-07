import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email;
  password;
  rpassword;


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onRegister() {
    this.auth.onRegister(this.email, this.password, this.rpassword);
  }

}
