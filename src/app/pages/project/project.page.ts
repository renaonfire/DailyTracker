import { Component, OnInit, Input } from '@angular/core';
import { NewDayModalPage } from '../new-day-modal/new-day-modal.page';
import { ModalController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController, private projectSrv: ProjectService, private router: Router) { }

  ngOnInit() {
    this.loadedDataSub = this.projectSrv.daysChanged.subscribe(days => {
      this.loadedDays = days;
    });
    if (this.selectedProject) {
      this.projectSrv.retrieveProjectDays(this.selectedProject);
    } 
    this.localDay = window.localStorage.getItem('newDayDate');
  }

  onNewDay() {
    this.onPresentModal(NewDayModalPage, {selectedProject: this.selectedProject, existingDays: this.loadedDays});
  }

  async onPresentModal(comp, prop: {}) {
    const modal = await this.modalCtrl.create({
      component: comp,
      componentProps: prop
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  onCloseProject() {
    this.modalCtrl.dismiss()
    this.router.navigateByUrl('/main/projects-summary');
  }

  onViewDay(day) {
    this.onPresentModal(ViewDayPage, {selectedDay: day, selectedProject: this.selectedProject});
  }

}
