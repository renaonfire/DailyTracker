import { Component, OnInit, Input } from '@angular/core';
import { NewDayModalPage } from '../new-day-modal/new-day-modal.page';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit {

  @Input() selectedProject;

  loadedData;
  loadedDataSub;
  localName = window.localStorage.getItem('projectName');

  constructor(private modalCtrl: ModalController, private projectSrv: ProjectService, private router: Router) { }

  ngOnInit() {
    this.loadedDataSub = this.projectSrv.dataChanged.subscribe(data => {
      this.loadedData = data;
      console.log('loaded', this.loadedData);
    });
    this.projectSrv.retrieveProjectData(this.selectedProject);
  }

  onNewDay() {
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewDayModalPage,
      componentProps: {name: 'this.name'}
    });
    return await modal.present();
  }

  onCloseProject() {
    this.selectedProject ? this.modalCtrl.dismiss() : this.router.navigateByUrl('/main/new-project');
  }

}
