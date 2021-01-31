import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/interfaces/project';
import { Subscription } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';
import { ProjectPage } from '../project/project.page';
import { Helpers } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-summary.page.html',
  styleUrls: ['./projects-summary.page.scss'],
})
export class ProjectsPage implements OnInit {

  localName;
  loadedProjects;
  loadedProjectsSub: Subscription;
  selectedProject;
  isLoading = true;

  constructor(
    private projectSrv: ProjectService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private helpers: Helpers
  ) { }

  getData() {
    this.loadedProjectsSub = this.projectSrv.projectChanged.subscribe(project => {
      this.loadedProjects = project;
      this.isLoading = false;
    });
    this.projectSrv.retrieveProjects();
    this.localName = window.localStorage.getItem('projectName');
  }

  ngOnInit() {
    this.getData();
  }

  ionViewWillEnter() {
    this.getData();
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
      this.onPresentModal();
    }
  }

  onClickProject(project: Project) {
    this.selectedProject = project;
    this.onPresentModal();
    this.projectSrv.updateLastViewed(this.selectedProject);
  }

  onDeleteProject(project: string) {
    if (this.localName === project) {
      window.localStorage.removeItem('projectName');
      this.localName = '';
    } else {
      this.projectSrv.deleteProject(project);
      for (let i = 0; i < this.loadedProjects.length; i++) {
        if (this.loadedProjects[i] === project) {
          this.loadedProjects.splice(i, 1); }
        }
    }
  }

  localDay(projectName) {
    return !!(window.localStorage.getItem(`${projectName}-temp-day`));
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectPage,
      componentProps: {selectedProject: this.selectedProject}
    });
    modal.onWillDismiss().then(() => {
      this.getData();
    });
    return await modal.present();
  }
}
