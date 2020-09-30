import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerCashPageRoutingModule } from './customer-cash-routing.module';

import { CustomerCashPage } from './customer-cash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerCashPageRoutingModule
  ],
  declarations: [CustomerCashPage]
})
export class CustomerCashPageModule {}
