import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
  
//   {
//     path: 'subscriber-recepit',
//     loadChildren: () => import('./subscriber-recepit/subscriber-recepit.module').then( m => m.SubscriberRecepitPageModule)
//   },
//   {
//     path: 'person-detail',
//     loadChildren: () => import('./person-detail/person-detail.module').then( m => m.PersonDetailPageModule)
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
