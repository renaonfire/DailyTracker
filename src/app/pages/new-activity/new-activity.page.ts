import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Helpers } from 'src/app/helpers/helpers';

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

  constructor(private modalCtrl: ModalController, private projectSrv: ProjectService, private helpers: Helpers) { }

  ngOnInit() {
    this.projectName = window.localStorage.getItem('projectName');
    this.newDayDate = this.selectedDay ? this.selectedDay : window.localStorage.getItem('newDayDate');
  }

  onTimeChanged(event) {
    this.startTime = event.target.value;
  }

  onModalClose() {
    this.modalCtrl.dismiss();
  }

  onSaveActivity() {
    const time = this.startTime ? this.startTime : new Date();
    if (this.selectedProject) {
      this.projectSrv.onAddActivity(this.selectedProject, this.newDayDate, time, this.category);
    } else {
      this.projectSrv.onCreateProjectWithActivity(this.projectName, this.newDayDate, time, this.category);
    }
  }


}
