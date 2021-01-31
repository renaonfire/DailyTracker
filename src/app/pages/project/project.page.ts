import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { ViewDayPage } from '../view-day/view-day.page';
import { NewActivityPage } from '../new-activity/new-activity.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  @Input() selectedProject;

  loadedDays;
  loadedDataSub: Subscription;
  localName;
  localDay;
  isLoading;


  constructor(private modalCtrl: ModalController,
              private projectSrv: ProjectService
              ) { }

  getData() {
    this.isLoading = true;
    this.loadedDataSub = this.projectSrv.daysChanged.subscribe(days => {
      this.loadedDays = days;
    });
    if (this.selectedProject) {
      // TODO need to subscibe to this and addt o view will enter. 
      this.projectSrv.retrieveProjectDays(this.selectedProject);
      this.isLoading = false;
    }
    this.localName = window.localStorage.getItem('projectName');
    this.localDay = window.localStorage.getItem(`${this.selectedProject}-temp-day`);
  }

  ngOnInit() {
    this.getData();
  }

  // ionViewWillEnter() {
  //  console.log('view will eneter')
  // }

  async onAddActivity() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps: {selectedProject: this.selectedProject, existingDays: this.loadedDays},
      presentingElement: await this.modalCtrl.getTop()
    });
    modal.onWillDismiss().then(() => {
      this.getData();
    });
    this.loadedDataSub.unsubscribe();
    return await modal.present();
  }

  async onViewDay(day) {
    const modal = await this.modalCtrl.create({
      component: ViewDayPage,
      componentProps: {selectedDay: day, selectedProject: this.selectedProject}
    });
    modal.onWillDismiss().then(() => {
      this.getData();
    });
    this.loadedDataSub.unsubscribe();
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

  ngOnDestroy() {
    if (this.loadedDataSub) {
      this.loadedDataSub.unsubscribe();
    }
  }

}
