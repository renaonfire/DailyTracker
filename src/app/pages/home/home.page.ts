import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProjectPage } from '../project/project.page';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latestProject;
  latestViewed;
  secondViewed;
  thirdViewed;

  constructor(private modalCtrl: ModalController, private projectSrv: ProjectService) {}

  ngOnInit() {
    this.latestProject = window.localStorage.getItem('latestProject');
    this.latestViewed = window.localStorage.getItem('latestViewed');
    this.secondViewed = window.localStorage.getItem('secondViewed');
    this.thirdViewed = window.localStorage.getItem('thirdViewed');
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onNewProject() {
    
  }

  async onShowLatestProject() {
    const modal = await this.modalCtrl.create({
      component: ProjectPage,
      componentProps: {selectedProject: this.latestProject},
    });
    this.projectSrv.updateLastViewed(this.latestProject);
    return await modal.present();
  }

  onCreateProject() {
  }

}
