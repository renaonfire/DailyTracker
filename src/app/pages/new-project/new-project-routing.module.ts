import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewProjectPage } from './new-project.page';

const routes: Routes = [
  {
    path: '',
    component: NewProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProjectPageRoutingModule {}
