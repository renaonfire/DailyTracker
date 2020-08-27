import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Project } from '../interfaces/project';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private _projectData = new BehaviorSubject<Project[]>([]);

  get projectData() {
    return this._projectData.asObservable();
  }

  projectChanged = new Subject<Project[]>();

  projectRef = firebase.database().ref('projects');

  onCreateProjectWithActivity(name: string, dt?, start?, cat?) {
    const key = this.projectRef.push().key;
    const newProject: Project = {
      id: key,
      projectName: name,
      data: {
        date: new Intl.DateTimeFormat('en-GB').format(dt),
        day: {
          activities: {
            startTime: start,
            category: cat
          }
        }
      }
    };
    this.projectRef.child(key).set(newProject);
  }

  retrieveProjects() {
    this.projectRef.once('value').then(resData => {
      const project = [];
      for (const key in resData.val()) {
        if (resData.val().hasOwnProperty(key)) {
          const name = resData.val()[key].projectName;
          const projectDate = resData.val()[key].data.date;
          const projects: Project = {
            id: key,
            projectName: name,
            data: {
              date: projectDate
            }
          }
          project.push(projects);
        }
      }
      this.projectChanged.next(project);
      return project;
    });
  }
}
