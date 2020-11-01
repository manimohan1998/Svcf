import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ResetPageRoutingModule } from './reset-routing.module';

import { ResetPage } from './reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPage]
})
export class ResetPageModule {}
