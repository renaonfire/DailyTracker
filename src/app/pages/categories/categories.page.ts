import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/service/categories.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Helpers } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  loadedCategories;
  loadedCategoriesSub: Subscription;
  newCategory;
  isLoading = true;

  constructor(private catSrv: CategoriesService,
              private alertCtrl: AlertController,
              private helpers: Helpers,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadedCategoriesSub = this.catSrv.categoriesChanged.subscribe(cat => {
      this.loadedCategories = cat;
      this.isLoading = false;
    });
    this.catSrv.retrieveCategories();
  }

  onAddNewCategory() {
    this.showNewCatAlert();
  }

  async showNewCatAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Category Name',
      inputs: [{name: 'newCatName'}],
      buttons: [{text: 'Cancel', role: 'cancel'}, {text: 'Save', handler: (data) => {
        this.newCategory = data.newCatName;
        this.validateNewCategory();
      }}]
    });
    return await alert.present();
  }

  validateNewCategory() {
    if (this.loadedCategories.find(cat => cat.name === this.newCategory ) || this.loadedCategories?.length >= 10) {
      const lengthExceeded: boolean = (this.loadedCategories.lenght >= 10);
      const alert = {
        head: lengthExceeded ? 'Too many entries' : 'Category Already Exists',
        message: lengthExceeded ? 'Please enter only up to 10 categories' : 'Please enter a different category name'
      };
      this.helpers.showAlert(alert.head, alert.message);
    } else {
      this.catSrv.createNewCategory(this.newCategory);
      this.loadedCategories.push({name: this.newCategory});
    }
  }

  onDeleteCategory(id: string, name: string) {
    this.catSrv.deleteCategory(id);
    for (let i = 0; i < this.loadedCategories.length; i++) {
      if (this.loadedCategories[i].name === name) {
        this.loadedCategories.splice(i, 1); }
      }
  }

  onClosePage() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    if (this.loadedCategoriesSub) {
      this.loadedCategoriesSub.unsubscribe()
    }
  }

}
