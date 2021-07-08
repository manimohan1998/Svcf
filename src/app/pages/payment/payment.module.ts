import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPage } from './payment.page';
import { CashPage } from './cash/cash.page';
import { CashPayPage } from './cashpay/cashpay.page';
import { MaterialModule } from '../../material/material.module';
import { Toast } from '@ionic-native/toast/ngx';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  },
  {
    path: 'cash',
    component: CashPage
  },
  {
    path:'cashpay',
    component:CashPayPage
  }
 
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentPage,CashPage,CashPayPage],
  providers:[Toast]
})
export class PaymentPageModule {}
