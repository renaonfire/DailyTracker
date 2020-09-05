import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { ViewDayPage } from '../view-day/view-day.page';
import { NewActivityPage } from '../new-activity/new-activity.page';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  @Input() selectedProject;

  loadedDays;
  loadedDataSub;
  localName = window.localStorage.getItem('projectName');
  localDay;
  isLoading = true;


  constructor(private modalCtrl: ModalController,
              private projectSrv: ProjectService
              ) { }

  ngOnInit() {
    this.loadedDataSub = this.projectSrv.daysChanged.subscribe(days => {
      this.loadedDays = days;
      this.isLoading = false;
    });
    if (this.selectedProject) {
      this.projectSrv.retrieveProjectDays(this.selectedProject);
    }
    this.localDay = window.localStorage.getItem(`${this.selectedProject}-temp-day`);
  }

  async onAddActivity() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps: {selectedProject: this.selectedProject, existingDays: this.loadedDays},
      presentingElement: await this.modalCtrl.getTop()
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  async onViewDay(day) {
    const modal = await this.modalCtrl.create({
      component: ViewDayPage,
      componentProps: {selectedDay: day, selectedProject: this.selectedProject}
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  onDeleteDay(day) {
    if (day === this.localDay) {
      window.localStorage.removeItem(`${this.selectedProject}-temp-day`);
      this.localDay = '';
    } else {
      this.projectSrv.deleteDayFromProject(this.selectedProject, day);
      for (let i = 0; i < this.loadedDays.length; i++) {
        if (this.loadedDays[i] === day) {
          this.loadedDays.splice(i, 1); }
        }
    }
  }
  
  async onPresentModal(comp, prop: {}) {
    const modal = await this.modalCtrl.create({
      component: comp,
      componentProps: prop
    });
    return await modal.present();
  }

  onCloseProject() {
    this.modalCtrl.dismiss();
  }

}
