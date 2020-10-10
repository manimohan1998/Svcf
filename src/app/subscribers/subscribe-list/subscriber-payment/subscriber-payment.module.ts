import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberPaymentPageRoutingModule } from './subscriber-payment-routing.module';

import { SubscriberPaymentPage } from './subscriber-payment.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SubscriberPaymentPageRoutingModule
  ],
  declarations: [SubscriberPaymentPage]
})
export class SubscriberPaymentPageModule {}
