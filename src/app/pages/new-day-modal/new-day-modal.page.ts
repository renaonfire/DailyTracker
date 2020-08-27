import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';
// import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-new-day-modal',
  templateUrl: './new-day-modal.page.html',
  styleUrls: ['./new-day-modal.page.scss'],
})
export class NewDayModalPage implements OnInit {

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  name;
  newDayDate;
  startTime;
  category;

  @ViewChild('activity') activity: ElementRef;
  showActivity: boolean;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.newDayDate = this.newDayDate ? this.newDayDate : this.currentDate();
  }

  currentDate() {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${this.months[month]} ${year}`;
  }

  onAddActivity() {
    window.localStorage.setItem('newDayDate', this.newDayDate);
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
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


// )