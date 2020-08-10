import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDayModalPage } from './new-day-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewDayModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDayModalPageRoutingModule {}
