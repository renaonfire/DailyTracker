import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';
import { ImagesPage } from '../images/images.page';

@Component({
  selector: 'app-view-day',
  templateUrl: './view-day.page.html',
  styleUrls: ['./view-day.page.scss'],
})
export class ViewDayPage implements OnInit {

  @Input() selectedProject;
  @Input() selectedDay;
  loadedActivities;
  loadedActivitiesSub;
  isLoading = true;

  constructor(private projectSrv: ProjectService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadedActivitiesSub = this.projectSrv.activitiesChanged.subscribe(activities => {
      this.loadedActivities = activities;
      this.isLoading = false;
    });
    this.projectSrv.retrieveDayActivities(this.selectedProject, this.selectedDay);
  }

  onCloseDay() {
    this.modalCtrl.dismiss();
  }

  onAddDayActivity() {
    this.onPresentModal();
  }

  onDeleteActivity(activityId) {
    this.projectSrv.deleteActivity(this.selectedProject, this.selectedDay, activityId);
    for (let i = 0; i < this.loadedActivities.length; i++) {
      if (this.loadedActivities[i].id === activityId) {
        this.loadedActivities.splice(i, 1);
      }
    }
  }

  async onViewImages(item) {
    if (!!item.images.length) {
      const modal = await this.modalCtrl.create({
        component: ImagesPage,
        componentProps: {passedImages: item.images, activityName: item.category}
      });
      return await modal.present();
    }
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps: {selectedProject: this.selectedProject, selectedDay: this.selectedDay},
      presentingElement: await this.modalCtrl.getTop()
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

}
