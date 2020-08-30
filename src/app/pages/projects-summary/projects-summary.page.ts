import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/interfaces/project';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ProjectPage } from '../project/project.page';
import { NewProjectPage } from '../new-project/new-project.page';

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
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadedProjectsSub = this.projectSrv.projectChanged.subscribe(project => {
      this.loadedProjects = project;
      this.isLoading = false;
    });
    this.projectSrv.retrieveProjects();
    this.localName = window.localStorage.getItem('projectName');
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  async onPressNewProject() {
    const modal = await this.modalCtrl.create({
      component: NewProjectPage,
      componentProps: {existingProjects: this.loadedProjects}
    });
    modal.onWillDismiss().then(() => {
      this.ngOnInit();
    });
    return await modal.present();
  }

  onClickProject(project: Project) {
    this.selectedProject = project;
    this.onPresentModal();
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
      this.ngOnInit();
    });
    return await modal.present();
  }
}
