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
  latestProjectChanged = new Subject<string>();
  daysChanged = new Subject<{}>();
  activitiesChanged = new Subject<{}>();
  userId = localStorage.getItem('currentUserId') || '';
  recentItems = JSON.parse(localStorage.getItem('recentItems'));
  projectRef = this.userId && firebase.database().ref(this.userId).child('project');
  latestProjectRef = this.userId && firebase.database().ref(this.userId).child('latest');
  recentProjectsRef = this.userId && firebase.database().ref(this.userId).child('recentProjects');

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
    this.latestProjectRef.child(name).set(newProject);
  }

  retrieveProjects() {
    if (this.projectRef) {
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
  }

  retrieveLatestProject() {
    if (this.latestProjectRef) {
      this.latestProjectRef.once('value').then(resData => {
        let projectName = '';
        for ( const name in resData.val()) {
          if (resData.val()) {
            projectName = resData.val()[name].projectName;
          }
        }
        this.latestProjectChanged.next(projectName);
        return projectName;
      });
    }
  }

  retrieveProjectDays(projectName: string) {
    if (this.projectRef) {
      const days = [];
      this.projectRef.child(projectName).child('days').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          days.push(childSnapshot.key);
      });
    });
      this.daysChanged.next(days);
      return days;
    }
  }

  retrieveDayActivities(projectName, day) {
    if (this.projectRef) {
      const activities = [];
      this.projectRef.child(projectName).child('days').child(day).once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          activities.push(childSnapshot.val());
      });
    });
      this.activitiesChanged.next(activities);
      return activities;
    }
  }

  onAddActivity(projectName, day, start, cat) {
    if (this.projectRef) {
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
  }

  deleteProject(projectName: string) {
    if (this.projectRef) {
      this.projectRef.child(projectName).remove();
    } 
  }

  deleteDayFromProject(projectName: string, day: string) {
    if (this.projectRef) {
      this.projectRef.child(projectName).child('days').child(day).remove();
    }
  }

  deleteActivity(projectName: string, day: string, id) {
    if (this.projectRef) {
      this.projectRef.child(projectName).child('days').child(day).child(id).remove();
    }
  }

  updateLastViewed(projectName: string) {
    if (this.recentItems) {
      this.recentItems = (this.recentItems || []).filter((items) => items !== projectName);
      this.recentItems.unshift(projectName);
      this.recentItems.length = Math.min(this.recentItems.length, 3);
      this.recentItems = [...this.recentItems];
    }
    else {
      this.recentItems = [projectName];
    }
    window.localStorage.setItem('recentItems', JSON.stringify(this.recentItems));
  }
}
