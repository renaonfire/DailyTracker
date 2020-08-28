import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Project, Activities } from '../interfaces/project';
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
    const newProject = {
      projectName: name
    };
    const newActivity: Activities = {
        daysDate: dt,
        startTime: start,
        category: cat
    };
    const activityId = Math.floor(Math.random() * Math.floor(9999999));
    // TODO add validation to ensure project name is unique
    this.projectRef.child(name).set(newProject);
    this.projectRef.child(name).child('days').child(dt).child(`${activityId}`).set(newActivity);
  }

  retrieveProjects() {
    this.projectRef.once('value').then(resData => {
      const projectName = [];
      for ( const name in resData.val()) {
        if (resData.val()) {
          projectName.push(resData.val()[name].projectName);
          console.log(projectName);
        }
      }
    this.projectChanged.next(projectName);
      // console.log(projectName);
    return projectName;
    // });
    })
  }
}
