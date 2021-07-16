import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayeccessAmountPage } from './payeccess-amount.page';

const routes: Routes = [
  {
    path: '',
    component: PayeccessAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayeccessAmountPageRoutingModule {}
