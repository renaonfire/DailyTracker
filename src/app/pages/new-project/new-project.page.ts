import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewProjectPageModule } from './new-project.module';
import { NewDayModalPage } from '../new-day-modal/new-day-modal.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  name;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNext() {
    this.router.navigateByUrl('/project');
  }

  
}
