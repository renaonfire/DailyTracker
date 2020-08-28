import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Project, Activities } from '../interfaces/project';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // private _projectData = new BehaviorSubject<Project[]>([]);

  // get projectData() {
  //   return this._projectData.asObservable();
  // }
  activityId = Math.floor(Math.random() * Math.floor(9999999));
  projectChanged = new Subject<Project[]>();
  dataChanged = new Subject<{}>();
  activitiesChanged = new Subject<{}>();

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
    // TODO add validation to ensure project name is unique
    this.projectRef.child(name).set(newProject);
    this.projectRef.child(name).child('days').child(dt).child(`${this.activityId}`).set(newActivity);
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
      return projectName;
    });
  }

  retrieveProjectData(projectName: string) {
    const days = [];
    this.projectRef.child(projectName).child('days').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        days.push(childSnapshot.key);
        console.log('days', days);
    });
  });
    this.dataChanged.next(days);
    return days;
  }

  retrieveDayActivities(projectName, day) {
    const activities = [];
    this.projectRef.child(projectName).child('days').child(day).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        activities.push(childSnapshot.val());
        console.log('activities', activities);
    });
  });
    this.activitiesChanged.next(activities);
    return activities;
  }

  onAddActivity(projectName, day, start, cat) {
    const newActivity: Activities = {
      daysDate: day,
      startTime: start,
      category: cat
    };
    this.projectRef.child(projectName).child('days').child(day).child(`${this.activityId}`).set(newActivity);
  }
}
