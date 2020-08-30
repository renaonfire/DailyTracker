import { Component, OnInit, Input } from '@angular/core';
import { NewDayModalPage } from '../new-day-modal/new-day-modal.page';
import { ModalController, AlertController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';
import { ViewDayPage } from '../view-day/view-day.page';

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
              private projectSrv: ProjectService,
              private router: Router,
              private alertCtrl: AlertController,
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

  async onNewDay() {
    const modal = await this.modalCtrl.create({
      component: NewDayModalPage,
      cssClass: 'new-day-modal',
      componentProps: {selectedProject: this.selectedProject, existingDays: this.loadedDays},
      presentingElement: await this.modalCtrl.getTop()
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
    this.router.navigateByUrl('/main/projects-summary');
  }

}
