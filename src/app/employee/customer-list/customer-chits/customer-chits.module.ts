import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerChitsPageRoutingModule } from './customer-chits-routing.module';

import { CustomerChitsPage } from './customer-chits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerChitsPageRoutingModule
  ],
  declarations: [CustomerChitsPage]
})
export class CustomerChitsPageModule {}
