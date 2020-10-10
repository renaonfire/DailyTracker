import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/service/project.service';
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

  async onViewPhoto(photo: string) {
    const modal = await this.modalCtrl.create({
      component: PhotoPage,
      componentProps: {photo}
    });
    return await modal.present();
  }

}
