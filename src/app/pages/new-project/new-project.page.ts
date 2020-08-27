import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.page.html',
  styleUrls: ['./new-project.page.scss'],
})
export class NewProjectPage implements OnInit {

  projectName: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNext() {
    window.localStorage.setItem('projectName', this.projectName);
    this.router.navigateByUrl('/project');
  }

  
}
