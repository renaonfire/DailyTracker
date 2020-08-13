import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  projectRef = firebase.database().ref('projects');

  constructor() { }

  onCreateProject(name: string, dt?, start?, cat?) {
    const key = this.projectRef.push().key;
    const newProject: Project = {
      id: key,
      projectName: name,
      data: {
        date: dt,
        day: {
          activities: {
            startTime: start,
            category: cat
          }
        }
      }
    };
    
    this.projectRef.child(key).set(newProject);

    //   this.spendInt = [{
  //     id: this.spendRef.child(month).push().key,
  //     data: {
  //         date:  new Intl.DateTimeFormat('en-GB').format(date),
  //         amount: value
  //     }
  // }];
  // console.log(this.spendInt);
  // this.spendRef.child(month).child(this.spendInt[0].id).set(this.spendInt[0].data);

  // secon add function
  // let generatedId = this.spendRef.push().key
  // console.log(date);
  // const newSpend = new SpendModel(
  //   generatedId,
  //   amount, 
  //   date,
  //   month
  // );
  // console.log(newSpend);
  
  // this.spendRef.child(month).child(generatedId).set(newSpend);
  // return this._spendData.next([newSpend]);
  }
}
