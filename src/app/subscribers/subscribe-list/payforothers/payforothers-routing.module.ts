import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayforothersPage } from './payforothers.page';

const routes: Routes = [
  {
    path: '',
    component: PayforothersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayforothersPageRoutingModule {}
