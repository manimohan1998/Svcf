import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriberRecepitPage } from './subscriber-recepit.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriberRecepitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriberRecepitPageRoutingModule {}
