import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId = localStorage.getItem('currentUserId') || '';
  userRef = this.userId && firebase.database().ref(this.userId).child('userInfo');
  userDetailsChanged = new Subject<User>();

  constructor() { }

  createUserDetails(email: string) {
    const newUser: User = {
        email
    };
    this.userRef.set(newUser);
  }

  updateUserDetails(email?: string, name?: string, surname?: string) {
    const user: User = {
      email,
      name,
      surname
    };
    this.userRef.set(user);
  }

  retrieveUserDetails() {
    this.userRef.once('value').then((data) => {
      if (data.val()) {
        const user = data.val();
        this.userDetailsChanged.next(user);
      };
    });
  }
}
