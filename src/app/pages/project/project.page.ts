import { Component, OnInit } from '@angular/core';
import { NewDayModalPage } from '../new-day-modal/new-day-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onNewDay() {
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewDayModalPage,
      cssClass: 'my-custom-class',
      componentProps: {name: 'this.name'}
    });
    return await modal.present();
  }

}
