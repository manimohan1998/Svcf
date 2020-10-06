import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'customer-list',
    loadChildren: () => import('./employee/customer-list/customer-list.module').then( m => m.CustomerListPageModule)
  },
  {
    path: 'subscribe-list',
    loadChildren: () => import('./subscribers/subscribe-list/subscribe-list.module').then( m => m.SubscribeListPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
