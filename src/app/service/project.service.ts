import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Project, Activities } from '../interfaces/project';
import { Subject } from 'rxjs';
import { Helpers } from '../helpers/helpers';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectChanged = new Subject<Project[]>();
  daysChanged = new Subject<{}>();
  activitiesChanged = new Subject<{}>();

  projectRef = firebase.database().ref('projects');

  constructor(private helpers: Helpers) {}

  onCreateProjectWithData(name: string, day: string, start: string, cat: string) {
    const activityId = Math.floor(Math.random() * Math.floor(9999999));
    const newDate = typeof day === 'string' ? day : this.helpers.formatDate(day);
    const newTime = start && typeof start === 'string' ? start : this.helpers.formatTime(start);
    const creationDate = this.helpers.formatDate();
    const newProject: Project = {
      projectName: name,
      createdDate: creationDate
    };
    const newActivity: Activities = {
        id: activityId,
        daysDate: newDate,
        startTime: newTime,
        category: cat
    };
    this.projectRef.child(name).set(newProject);
    this.projectRef.child(name).child('days').child(newDate).child(`${activityId}`).set(newActivity);
  }

  retrieveProjects() {
    this.projectRef.once('value').then(resData => {
      const projectName = [];
      for ( const name in resData.val()) {
        if (resData.val()) {
          projectName.push(resData.val()[name].projectName);
        }
      }
      this.projectChanged.next(projectName);
      return projectName;
    });
  }

  retrieveProjectDays(projectName: string) {
    const days = [];
    this.projectRef.child(projectName).child('days').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        days.push(childSnapshot.key);
    });
  });
    this.daysChanged.next(days);
    return days;
  }

  retrieveDayActivities(projectName, day) {
    const activities = [];
    this.projectRef.child(projectName).child('days').child(day).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        activities.push(childSnapshot.val());
    });
  });
    this.activitiesChanged.next(activities);
    return activities;
  }

  onAddActivity(projectName, day, start, cat) {
    const activityId = Math.floor(Math.random() * Math.floor(9999999));
    const newDay = typeof day === 'string' ? day : this.helpers.formatDate(day);
    const newTime = typeof start === 'string' ? start : this.helpers.formatTime(start);
    const newActivity: Activities = {
      id: activityId,
      daysDate: newDay,
      startTime: newTime,
      category: cat
    };
    this.projectRef.child(projectName).child('days').child(newDay).child(`${activityId}`).set(newActivity);
  }

  deleteProject(projectName: string) {
    this.projectRef.child(projectName).remove();
  }

  deleteDayFromProject(projectName: string, day: string) {
    this.projectRef.child(projectName).child('days').child(day).remove();
  }

  deleteActivity(projectName: string, day: string, id) {
    this.projectRef.child(projectName).child('days').child(day).child(id).remove();
  }
}
