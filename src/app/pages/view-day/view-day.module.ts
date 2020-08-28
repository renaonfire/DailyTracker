import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDayPageRoutingModule } from './view-day-routing.module';

import { ViewDayPage } from './view-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDayPageRoutingModule
  ],
  declarations: [ViewDayPage]
})
export class ViewDayPageModule {}
