import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowChitsPage } from './show-chits.page';

const routes: Routes = [
  {
    path: '',
    component: ShowChitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowChitsPageRoutingModule {}
