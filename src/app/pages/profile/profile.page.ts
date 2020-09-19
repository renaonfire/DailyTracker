import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail = window.localStorage.getItem('currentUser');

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onClose() {
    this.modalCtrl.dismiss();
  }

}
