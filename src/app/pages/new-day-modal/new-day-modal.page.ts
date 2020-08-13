import { Component, Input } from '@angular/core';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-new-day-modal',
  templateUrl: './new-day-modal.page.html',
  styleUrls: ['./new-day-modal.page.scss'],
})
export class NewDayModalPage {

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  name;
  projectDate;
  startTime;
  category;

  constructor(private projectService: ProjectService) { }

  currentDate() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${this.months[month]} ${year}`;
  }

  currentTime() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    return `${hour}:${minutes}`;
  }

  onSaveActivity() {
    this.projectService.onCreateProject(this.name, this.projectDate, this.startTime, this.category);
  }

  onSaveDay() {

  }

}


// get spend back
// this.spendRef.child(month).once('value').then(resData => {
//   let spendValues = [];
//   for (const key in resData.val()) {
//     if(resData.val().hasOwnProperty(key)) {
//       spendValues.push(+resData.val()[key].amount);
//     }
//   }
//   this.sumOfSpend = spendValues.reduce((a, b) => a + b) as number;
//   this.sumChanged.next(this.sumOfSpend);
//   return this.sumOfSpend;
// }
// )