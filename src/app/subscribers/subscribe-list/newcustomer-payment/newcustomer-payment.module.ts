import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcustomerPaymentPageRoutingModule } from './newcustomer-payment-routing.module';

import { NewcustomerPaymentPage } from './newcustomer-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewcustomerPaymentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewcustomerPaymentPage]
})
export class NewcustomerPaymentPageModule {}
