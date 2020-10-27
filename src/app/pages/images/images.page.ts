import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoPage } from '../photo/photo.page';

@Component({
  selector: 'app-images',
  templateUrl: './images.page.html',
  styleUrls: ['./images.page.scss'],
})
export class ImagesPage implements OnInit {

  passedImages;
  activityName;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onClosePage() {
    this.modalCtrl.dismiss();
  }

  async onViewPhoto(index: number) {
    const modal = await this.modalCtrl.create({
      component: PhotoPage,
      componentProps: {photos: this.passedImages, selectedPhotoIndex: index}
    });
    return await modal.present();
  }

}
