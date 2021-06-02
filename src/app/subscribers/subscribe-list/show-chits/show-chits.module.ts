import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowChitsPageRoutingModule } from './show-chits-routing.module';

import { ShowChitsPage } from './show-chits.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowChitsPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ShowChitsPage]
})
export class ShowChitsPageModule {}
