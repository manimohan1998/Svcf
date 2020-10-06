import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscribeListPage } from './subscribe-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubscribeListPage
  },
  {
    path: 'subscriber-payment',
    loadChildren: () => import('./subscriber-payment/subscriber-payment.module').then( m => m.SubscriberPaymentPageModule)
  },
  {
    path: 'subscriber-recepit',
    loadChildren: () => import('./subscriber-recepit/subscriber-recepit.module').then( m => m.SubscriberRecepitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribeListPageRoutingModule {}
