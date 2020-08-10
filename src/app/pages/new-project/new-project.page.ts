import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProjectPageModule } from './new-project.module';
import { NewDayModalPage } from '../new-day-modal/new-day-modal.page';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  name;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onAddDay() {
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewDayModalPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
