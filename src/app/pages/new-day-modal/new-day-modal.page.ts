import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';
// import { ProjectService } from '../../service/project.service';

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

  @ViewChild('activity') activity: ElementRef;
  showActivity: boolean;

  constructor(private modalCtrl: ModalController) { }

  currentDate() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${this.months[month]} ${year}`;
  }

  onAddActivity() {
   this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      cssClass: 'my-custom-class',
      componentProps: {name: 'this.name'}
    });
    return await modal.present();
  }


  onCloseModal() {
    this.modalCtrl.dismiss();
  }

  // onSaveActivity() {
  //   this.projectService.onCreateProject(this.name, this.projectDate, this.startTime, this.category);
  // }


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