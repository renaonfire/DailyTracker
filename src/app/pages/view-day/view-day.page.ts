import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';
import { ImagesPage } from '../images/images.page';
import { Activities } from 'src/app/interfaces/project';

@Component({
  selector: 'app-view-day',
  templateUrl: './view-day.page.html',
  styleUrls: ['./view-day.page.scss'],
})
export class ViewDayPage implements OnInit {

  @Input() selectedProject;
  @Input() selectedDay;
  loadedActivities: Activities[];
  loadedActivitiesSub;
  isLoading = true;

  constructor(private projectSrv: ProjectService, private modalCtrl: ModalController) { }

  getData() {
    this.loadedActivitiesSub = this.projectSrv.activitiesChanged.subscribe(activities => {
      this.loadedActivities = activities;
    });
    this.projectSrv.retrieveDayActivities(this.selectedProject, this.selectedDay);
  }

  ngOnInit() {
    this.getData();
    this.isLoading = false;
  }

  onCloseDay() {
    this.modalCtrl.dismiss();
  }

  onAddDayActivity() {
    this.onPresentModal();
  }

  onDeleteActivity(activityId) {
    this.projectSrv.deleteActivity(this.selectedProject, this.selectedDay, activityId);
    for (let i = 0; i < this.loadedActivities?.length; i++) {
      if (this.loadedActivities[i].id === activityId) {
        this.loadedActivities.splice(i, 1);
      }
    }
  }

  onEditActivity(activity: Activities) {
    return this.onPresentModal(activity.startTime, activity.type, activity.category, activity.images, activity.id);
  }

  async onViewImages(item) {
    if (!!item.images?.length) {
      const modal = await this.modalCtrl.create({
        component: ImagesPage,
        componentProps: {passedImages: item.images, activityName: item.category}
      });
      return await modal.present();
    }
  }

  async onPresentModal(startTime?, type?, retrievedCategory?, images?, activityId?) {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps:
        {selectedProject: this.selectedProject,
        selectedDay: this.selectedDay,
        startTime,
        type,
        retrievedCategory,
        images,
        activityId
      },
      presentingElement: await this.modalCtrl.getTop()
    });
    modal.onWillDismiss().then(() => {
      this.getData();
    });
    return await modal.present();
  }

  ngOnDestroy() {
    if (this.loadedActivitiesSub) {
      this.loadedActivitiesSub.unsubscribe();
    }
  }

}
