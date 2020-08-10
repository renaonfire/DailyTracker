import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  onStartProject() {
    this.router.navigateByUrl('/main/new-project');
  }

  onShowLatestProject() {
    this.router.navigateByUrl('/home');
  }

}
