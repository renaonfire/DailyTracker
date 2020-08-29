import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';

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

  categories = {
    travel: 'Travel',
    weather: 'Weather Downtime',
    working: 'Working'
  }

  constructor(private projectSrv: ProjectService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadedActivitiesSub = this.projectSrv.activitiesChanged.subscribe(activities => {
      this.loadedActivities = activities;
    });
    this.projectSrv.retrieveDayActivities(this.selectedProject, this.selectedDay);
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onCloseDay() {
    this.modalCtrl.dismiss();
  }

  onAddDayActivity() {
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps: {selectedProject: this.selectedProject, selectedDay: this.selectedDay}
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    })
    return await modal.present();
  }

}
