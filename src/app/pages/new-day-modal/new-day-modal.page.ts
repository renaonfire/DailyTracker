import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';
import { Helpers } from 'src/app/helpers/helpers';
// import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-new-day-modal',
  templateUrl: './new-day-modal.page.html',
  styleUrls: ['./new-day-modal.page.scss'],
})
export class NewDayModalPage implements OnInit {

  @Input() selectedProject;
  name;
  newDayDate;
  startTime;
  category;

  constructor(private modalCtrl: ModalController, private helpers: Helpers) { }

  ngOnInit() {
    this.newDayDate = this.newDayDate ? this.helpers.formatDate(this.newDayDate) : this.currentDate();
  }

  currentDate() {
    return this.helpers.formatDate();
  }

  onAddActivity() {
    window.localStorage.setItem('newDayDate', this.newDayDate);
    this.onPresentModal();
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps: {selectedProject: this.selectedProject}
    });
    return await modal.present();
  }

  onDateChanged(event) {
    this.newDayDate = this.helpers.formatDate(event.target.value);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }
}
