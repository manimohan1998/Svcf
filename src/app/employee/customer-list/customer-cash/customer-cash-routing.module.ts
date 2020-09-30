import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerCashPage } from './customer-cash.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerCashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerCashPageRoutingModule {}
