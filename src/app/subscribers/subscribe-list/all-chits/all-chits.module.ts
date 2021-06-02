import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllChitsPageRoutingModule } from './all-chits-routing.module';

import { AllChitsPage } from './all-chits.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllChitsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AllChitsPage]
})
export class AllChitsPageModule {}
