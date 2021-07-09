import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectappPageRoutingModule } from './selectapp-routing.module';

import { SelectappPage } from './selectapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectappPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SelectappPage]
})
export class SelectappPageModule {}
