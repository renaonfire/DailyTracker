import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ProjectPage } from '../project/project.page';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/service/project.service';
import { Helpers } from 'src/app/helpers/helpers';
import { ProfilePage } from '../profile/profile.page';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  latestProject;
  recentItems;
  loadedProjects;
  loadedProjectsSub: Subscription;
  latestProjectSub: Subscription;
  selectedProject;
  incompleteProject;
  userImage = '../../../assets/avatar.png';
  userDetailsSub: Subscription;
  isLoading = true;

  constructor(private modalCtrl: ModalController,
              private projectSrv: ProjectService,
              private alertCtrl: AlertController,
              private helpers: Helpers,
              private userSrv: UserService) {}

  ngOnInit() {
    this.recentItems = JSON.parse(window.localStorage.getItem('recentItems'));
    this.incompleteProject = window.localStorage.getItem('projectName');
    // TODO refactor to not have to retrieve all projects to check name
    this.loadedProjectsSub = this.projectSrv.projectChanged.subscribe(projects => {
      this.loadedProjects = projects;
    });
    this.projectSrv.retrieveProjects();
    this.latestProjectSub = this.projectSrv.latestProjectChanged.subscribe(project => {
      this.latestProject = project;
      this.isLoading = false;
    });
    this.projectSrv.retrieveLatestProject();
    this.userDetailsSub = this.userSrv.userDetailsChanged.subscribe(user => {
      this.userImage = user.image;
    });
    this.userSrv.retrieveUserDetails();
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  onAvatarClick() {
    this.onPresentModal(ProfilePage);
  }

  async onNewProjectAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Enter Project Name',
      inputs: [{name: 'projectName', label: 'Project Name'}],
      buttons: [{text: 'Cancel', role: 'cancel'}, {text: 'OK', handler: (data) => {
        this.validateProjectName(data.projectName);
      }}]
    });
    return alert.present();
  }

  validateProjectName(name: string) {
    if (this.loadedProjects && this.loadedProjects.find(p => p === name)) {
      const alert = {
        head: 'Project Name Already Exists',
        msg: 'Please enter unique project name'
      };
      this.helpers.showAlert(alert.head, alert.msg);
    } else {
      window.localStorage.setItem('projectName', name);
      this.selectedProject = window.localStorage.getItem('projectName');
      this.onPresentModal(ProjectPage, true);
    }
  }

  async onPresentModal(page, update?: boolean) {
    const modal = await this.modalCtrl.create({
      component: page,
      componentProps: {selectedProject: this.selectedProject}
    });
    if (update) {
      modal.onWillDismiss().then(() => {
        this.ngOnInit();
      });
    }
    return await modal.present();
  }

  async onShowProject(project: string) {
    const modal = await this.modalCtrl.create({
      component: ProjectPage,
      componentProps: {selectedProject: project},
    });
    this.projectSrv.updateLastViewed(project);
    return await modal.present();
  }

}
