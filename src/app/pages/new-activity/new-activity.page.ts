import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Helpers } from 'src/app/helpers/helpers';
import { CategoriesService } from 'src/app/service/categories.service';
import { Subscription } from 'rxjs';
import { CameraResultType, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.page.html',
  styleUrls: ['./new-activity.page.scss'],
})
export class NewActivityPage implements OnInit {

  @Input() selectedProject;
  @Input() selectedDay;
  @Input() startTime;
  @Input() images = [];
  @Input() activityId;
  @Input() retrievedCategory: string;
  @Input() type: string;
  projectName;
  newDayDate;
  addedDay;
  existingDaysSub: Subscription;
  existingDays;
  category;
  newCategory;
  existingCategoriesSub: Subscription;
  existingCategories;
  invalidType: boolean;
  invalidCategory: boolean;
  hasChangesOnActivity: boolean;
  hasDateChanges: boolean;

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
      if (this.activityId && this.retrievedCategory) {
        this.category = this.existingCategories?.filter(cat => cat.name === this.retrievedCategory)[0]?.name;
      }
    });
    this.existingDaysSub = this.projectSrv.daysChanged.subscribe(days => {
      this.existingDays = days;
    });
    this.projectSrv.retrieveProjectDays(this.selectedProject);
    this.catSrv.retrieveCategories();
    if (this.newDayDate && !this.startTime) {
      this.currentTime();
    } else {
      this.currentDate();
    }
  }

  onModalClose() {
    if (this.hasChangesOnActivity) {
      this.alertCtrl.create({
        header: 'Changes not saved',
        message: 'Your changes will be discarded',
        buttons: [
          {text: 'Cancel', role: 'cancel'},
          { text: 'Ok',
            handler: () =>  this.modalCtrl.dismiss({
              animated: false
            })}
          ]
      }).then(alertEl => alertEl.present());
    }
    else {
      this.modalCtrl.dismiss();
    }
  }

  currentTime() {
    this.startTime = this.helpers.formatTime();
  }

  currentDate() {
    this.addedDay = this.helpers.formatDate();
  }

  onDateChanged(event) {
    if (event.target.value !== this.addedDay) {
      this.addedDay = this.helpers.formatDate(event.target.value);
      if (this.activityId) {
        this.hasChangesOnActivity = true;
        this.hasDateChanges = true;
      }
    }
  }

  onSaveDay() {
    this.newDayDate = this.addedDay;
    this.currentTime();
    const matchingDays = this.existingDays.filter(d => d === this.addedDay);
    if (!matchingDays.length) {
      window.localStorage.setItem(`${this.selectedProject}-temp-day`, this.newDayDate);
    }
  }

  async onNewImage() {
    const { Camera } = Plugins;
    await Camera.getPhoto({
      resultType: CameraResultType.DataUrl
    }).then((img) => {
      this.images.push(img.dataUrl);
      this.hasChangesOnActivity = true;
    });
  }

  onDeleteImage(index: number) {
    this.images.splice(index, index + 1);
    this.hasChangesOnActivity = true;
  }

  validateFields() {
    if (!this.type) {
      this.invalidType = true;
    } else {
      this.invalidType = false;
    }
    if (!this.category) {
      this.invalidCategory = true;
    } else {
      this.invalidCategory = false;
    }
  }

  onSaveActivity() {
    this.validateFields();
    if (this.type && this.category) {
      const time = this.startTime ? this.startTime : new Date();
      const img = !!this.images?.length ? this.images : [];
      if (this.selectedProject && this.selectedProject !== this.projectName) {
        if (this.hasDateChanges && this.selectedDay !== this.addedDay) {
          this.projectSrv.deleteActivity(this.selectedProject, this.selectedDay, this.activityId);
          this.newDayDate = this.addedDay;
          this.hasDateChanges = false;
        }
        this.projectSrv.onAddActivity(this.selectedProject, this.newDayDate, time, this.type, this.category, img, this.activityId);
      } else {
        this.projectSrv.onCreateProjectWithData(this.projectName, this.newDayDate, time, this.type, this.category, img);
        window.localStorage.removeItem('projectName');
      }
      window.localStorage.removeItem(`${this.selectedProject}-temp-day`);
      this.hasChangesOnActivity = false;
      this.onModalClose();
    }
  }

  validateNewCategory() {
    if (this.existingCategories.find(cat => cat.name === this.newCategory ) || this.existingCategories.length >= 10) {
      const lengthExceeded: boolean = (this.existingCategories.lenght >= 10);
      const alert = {
        head: lengthExceeded ? 'Too many entries' : 'Category Already Exists',
        message: lengthExceeded ? 'Please enter only up to 10 categories' : 'Please enter a different category name'
      };
      this.helpers.showAlert(alert.head, alert.message);
    } else {
      this.catSrv.createNewCategory(this.newCategory);
      this.existingCategories.push({name: this.newCategory});
      this.category = this.newCategory;
    }
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

  ngOnDestroy() {
    if (this.existingCategoriesSub) {
      this.existingCategoriesSub.unsubscribe();
    }
    if (this.existingDaysSub) {
      this.existingDaysSub.unsubscribe();
    }
  }
}
