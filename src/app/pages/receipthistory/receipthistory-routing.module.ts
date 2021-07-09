import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceipthistoryPage } from './receipthistory.page';

const routes: Routes = [
  {
    path: '',
    component: ReceipthistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceipthistoryPageRoutingModule {}
