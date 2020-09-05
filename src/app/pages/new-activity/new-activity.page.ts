import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Helpers } from 'src/app/helpers/helpers';
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
    this.existingCategoriesSub = this.catSrv.categoriesChanged.subscribe(cat => {
      this.existingCategories = cat;
    });
    this.catSrv.retrieveCategories();
    if (this.newDayDate) {
      this.currentTime();
    } else {
      this.currentDate();
    }
  }

  onModalClose() {
    this.modalCtrl.dismiss({
      animated: false
    });
  }

  currentTime() {
    this.startTime = this.helpers.formatTime();
  }

  currentDate() {
    this.addedDay = this.helpers.formatDate();
  }

  onDateChanged(event) {
    this.addedDay = this.helpers.formatDate(event.target.value);
  }

  onSaveDay() {
    this.newDayDate = this.addedDay;
    window.localStorage.setItem(`${this.selectedProject}-temp-day`, this.newDayDate);
    this.currentTime();
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

  validateNewCategory(catName: string) {
    if (this.existingCategories === catName || this.existingCategories.length >= 10) {
      const lengthExceeded: boolean = (this.existingCategories.lenght >= 10);
      const alert = {
        head: lengthExceeded ? 'Too many entries' : 'Category Already Exists',
        message: lengthExceeded ? 'Please enter only up to 10 categories' : 'Please enter a different category name'
      };
      this.helpers.showAlert(alert.head, alert.message);
    } else {
      this.catSrv.createNewCategory(this.newCategory);
      this.existingCategories.push(this.newCategory);
      this.category = this.newCategory;
    }
  }
  
  async showNewCatAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Category Name',
      inputs: [{name: 'newCatName'}],
      buttons: [{text: 'Cancel', role: 'cancel'}, {text: 'Save', handler: (data) => {
        this.newCategory = data.newCatName;
        this.validateNewCategory(this.newCategory);
      }}]
    });
    return await alert.present();
  }
}
