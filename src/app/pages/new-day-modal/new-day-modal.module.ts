import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDayModalPageRoutingModule } from './new-day-modal-routing.module';

import { NewDayModalPage } from './new-day-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDayModalPageRoutingModule
  ],
  declarations: [NewDayModalPage]
})
export class NewDayModalPageModule {}
