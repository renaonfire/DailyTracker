import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from 'src/app/interfaces/project';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ProjectPage } from '../project/project.page';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  loadedProjects: Project[];
  loadedProjectsSub: Subscription;
  selectedProject;

  constructor(
    private router: Router,
    private projectSrv: ProjectService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadedProjectsSub = this.projectSrv.projectChanged.subscribe(project => {
      this.loadedProjects = project;
      console.log(this.loadedProjects);
    });
    this.projectSrv.retrieveProjects();
  }

  onPressNewProject() {
    this.router.navigateByUrl('/main/new-project');
  }

  onClickProject(project: Project) {
    this.selectedProject = project;
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: ProjectPage,
      componentProps: {project: this.selectedProject}
    });
    return await modal.present();
  }
}
