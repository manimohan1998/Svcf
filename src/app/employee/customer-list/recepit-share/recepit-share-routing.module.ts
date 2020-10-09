import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepitSharePage } from './recepit-share.page';

const routes: Routes = [
  {
    path: '',
    component: RecepitSharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepitSharePageRoutingModule {}
