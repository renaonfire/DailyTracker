import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDayPage } from './view-day.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDayPageRoutingModule {}
