import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewcustomerPaymentPage } from './newcustomer-payment.page';

const routes: Routes = [
  {
    path: '',
    component: NewcustomerPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewcustomerPaymentPageRoutingModule {}
