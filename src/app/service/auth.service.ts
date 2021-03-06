import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AES256 } from '@ionic-native/aes-256/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  constructor(private auth: AngularFireAuth,
              private alertCtrl: AlertController,
              private router: Router,
              private userSrv: UserService,
              private aes: AES256) { }

//   async generateSecureKey(password: string) {
//     return this.secureKey = await this.aes.generateSecureKey(password);
//  }

  async onRegister(email: string, password: string, rpassword: string) {
    if (password !== rpassword) {
      const alert = await this.alertCtrl.create({
        header: 'Password not matching',
        message: 'The entered passwords did not match, please try again',
        buttons: ['OK'],
      });
      alert.present();
    } else {
      try {
        await this.auth.createUserWithEmailAndPassword(email, password);
        this.auth.onAuthStateChanged((user) => {
          localStorage.setItem('currentUserId', user.uid);
          localStorage.setItem('currentUser', email);
        });
        this.authState.next(true);
        this.router.navigateByUrl('/main');
        this.userSrv.createUserDetails(email);
      } catch (err) {
        console.log(err);
        this.showAlert(err);
      }
    }
  }

  async signIn(email, password) {
    try {
      await this.auth.signInWithEmailAndPassword(
        email,
        password
      );
      this.auth.onAuthStateChanged((user) => {
        localStorage.setItem('currentUserId', user?.uid);
      });
      localStorage.setItem('currentUser', email);
      this.authState.next(true);
      this.router.navigateByUrl('/main');
    } catch (err) {
        this.showAlert(err);
    }
  }

  async showAlert(err) {
    const header = err.code?.replace('auth/', ' ');
    const message = err.message;
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    alert.present();
  }

  // TODO check if this is used
  isAuthenticated() {
    if (localStorage.getItem('currentUser')) {
      this.authState.next(true);
    }
    return this.authState.value;
  }

  async logOut() {
    this.auth.signOut().then(() => {
    }).catch((error) => {
      this.showAlert(error);
    });
  }
}
