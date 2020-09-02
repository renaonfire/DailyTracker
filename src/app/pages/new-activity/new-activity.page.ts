import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Helpers } from 'src/app/helpers/helpers';
import { ViewDayPage } from '../view-day/view-day.page';
import { CategoriesService } from 'src/app/service/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  @Input() selectedProject;
  @Input() selectedDay;
  projectName;
  newDayDate;
  startTime;
  category;
  addedDay;
  existingDays;
  type;
  newCategory;
  existingCategoriesSub: Subscription;
  existingCategories;

  constructor(private modalCtrl: ModalController,
              private projectSrv: ProjectService,
              private helpers: Helpers,
              private catSrv: CategoriesService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.projectName = window.localStorage.getItem('projectName');
    this.newDayDate = this.selectedDay ? this.selectedDay : window.localStorage.getItem(`${this.selectedProject}-temp-day`);
    this.addedDay = this.currentDate();
    this.existingCategoriesSub = this.catSrv.categoriesChanged.subscribe(cat => {
      this.existingCategories = cat;
      console.log(this.existingCategories);
    });
    this.catSrv.retrieveCategories();
  }

  onTimeChanged(event) {
    this.startTime = event.target.value;
  }

  onModalClose() {
    this.modalCtrl.dismiss({
      animated: false
    });
  }

  async onPresentDay() {
    const modal = await this.modalCtrl.create({
      component: ViewDayPage,
      componentProps: {selectedProject: this.selectedProject, selectedDay: this.newDayDate}
    });
    return modal.present();
  }

  currentDate() {
    return this.helpers.formatDate();
  }

  onDateChanged(event) {
    this.addedDay = this.helpers.formatDate(event.target.value);
  }

  onSaveDay() {
    this.newDayDate = this.addedDay;
    window.localStorage.setItem(`${this.selectedProject}-temp-day`, this.addedDay);
  }

  onSaveActivity() {
    const time = this.startTime ? this.startTime : new Date();
    const cat = `${this.type} ${this.category}`;
    if (this.selectedProject && this.selectedProject !== this.projectName) {
      this.projectSrv.onAddActivity(this.selectedProject, this.newDayDate, time, cat);
    } else {
      this.projectSrv.onCreateProjectWithData(this.projectName, this.newDayDate, time, cat);
      window.localStorage.removeItem('projectName');
    }
    window.localStorage.removeItem(`${this.selectedProject}-temp-day`);
    this.onModalClose();
  }

  onNewCustomCategory() {
    return this.showNewCatAlert();
  }
  
  async showNewCatAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Category Name',
      inputs: [{name: 'newCatName'}],
      buttons: [{text: 'Cancel', role: 'cancel'}, {text: 'Save', handler: (data) => {
        this.newCategory = data.newCatName;
        this.catSrv.createNewCategory(this.newCategory);
      }}]
    });
    return await alert.present();
  }
}
