import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewActivityPage } from '../new-activity/new-activity.page';
import { Helpers } from 'src/app/helpers/helpers';


@Component({
  selector: 'app-new-day-modal',
  templateUrl: './new-day-modal.page.html',
  styleUrls: ['./new-day-modal.page.scss'],
})
export class NewDayModalPage implements OnInit {

  @Input() selectedProject;
  newDayDate;
  existingDays;

  constructor(private modalCtrl: ModalController, private helpers: Helpers) { }

  ngOnInit() {
    this.newDayDate = this.newDayDate ? this.helpers.formatDate(this.newDayDate) : this.currentDate();
  }

  currentDate() {
    return this.helpers.formatDate();
  }

  onShowAlert() {
    const alert = {
      head: 'Day Already Exists',
      msg: 'Please select day from exisitng list to add activity'
    };
    this.helpers.showAlert(alert.head, alert.msg);
  }

  onAddActivity() {
    if (this.existingDays && this.existingDays.find(day => day === this.newDayDate)) {
      this.onShowAlert();
    } else {
      window.localStorage.setItem(`${this.selectedProject}-temp-day`, this.newDayDate);
      this.onPresentModal();
    }
  }

  async onPresentModal() {
    const modal = await this.modalCtrl.create({
      component: NewActivityPage,
      componentProps: {selectedProject: this.selectedProject, creatingDay: true},
      presentingElement: await this.modalCtrl.getTop()
    });
    return await modal.present();
  }

  onDateChanged(event) {
    this.newDayDate = this.helpers.formatDate(event.target.value);
  }

  onCloseModal() {
    this.modalCtrl.dismiss({
      animated: false
    });
  }
}
