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
  },
  {
    path: 'person-detail',
    loadChildren: () => import('./person-detail/person-detail.module').then( m => m.PersonDetailPageModule)
  },  {
    path: 'payment-success',
    loadChildren: () => import('./payment-success/payment-success.module').then( m => m.PaymentSuccessPageModule)
  },
  {
    path: 'all-chits',
    loadChildren: () => import('./all-chits/all-chits.module').then( m => m.AllChitsPageModule)
  },
  {
    path: 'show-chits',
    loadChildren: () => import('./show-chits/show-chits.module').then( m => m.ShowChitsPageModule)
  },
  {
    path: 'payforothers',
    loadChildren: () => import('./payforothers/payforothers.module').then( m => m.PayforothersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscribeListPageRoutingModule {}
