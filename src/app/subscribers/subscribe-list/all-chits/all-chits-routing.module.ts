import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllChitsPage } from './all-chits.page';

const routes: Routes = [
  {
    path: '',
    component: AllChitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllChitsPageRoutingModule {}
