import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  photo;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onClosePage() {
    this.modalCtrl.dismiss();
  }

}
