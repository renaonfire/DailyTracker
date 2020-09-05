import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriesPage } from '../categories/categories.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor(private modalCtrl: ModalController) { }

  async openCategorySettings() {
    const modal = await this.modalCtrl.create({
      component: CategoriesPage,
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }

}
