import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ModalController } from '@ionic/angular';

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


  constructor(private projectSrv: ProjectService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadedActivitiesSub = this.projectSrv.activitiesChanged.subscribe(activities => {
      this.loadedActivities = activities;
    });
    this.projectSrv.retrieveDayActivities(this.selectedProject, this.selectedDay);
  }

  onCloseDay() {
    this.modalCtrl.dismiss();
  }

}