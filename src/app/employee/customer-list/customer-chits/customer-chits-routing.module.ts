import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerChitsPage } from './customer-chits.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerChitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerChitsPageRoutingModule {}
