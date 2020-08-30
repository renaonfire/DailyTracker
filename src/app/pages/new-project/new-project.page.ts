import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Helpers } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  projectName: string;
  existingProjects;

  constructor(private router: Router, private modalCtrl: ModalController, private helpers: Helpers) { }

  ngOnInit() {
  }

  onClosePage() {
    this.modalCtrl.dismiss();
  }

  onSave() {
    if (this.existingProjects && this.existingProjects.find(p => p === this.projectName)) {
      const alert = {
        head: 'Project Name Already Exists',
        msg: 'Please enter unique project name'
      }
      this.helpers.showAlert(alert.head, alert.msg);
    } else {
      window.localStorage.setItem('projectName', this.projectName);
      this.onClosePage();
    }
  }

  
}
