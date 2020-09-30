import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListPage } from './customer-list.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerListPage
  },
  {
    path: 'customer-chits',
    loadChildren: () => import('./customer-chits/customer-chits.module').then( m => m.CustomerChitsPageModule)
  },
  {
    path: 'recepit-share',
    loadChildren: () => import('./recepit-share/recepit-share.module').then( m => m.RecepitSharePageModule)
  },
  {
    path: 'customer-cash',
    loadChildren: () => import('./customer-cash/customer-cash.module').then( m => m.CustomerCashPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerListPageRoutingModule {}
