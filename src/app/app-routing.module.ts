import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Login/Auth/auth.guard';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'selectapp',
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
  //canActivate: [AuthGuard]
  {
    path: 'forgot-password',
    loadChildren: () => import('./Login/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./Login/forgot-password/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
 

  //employee
  
  { path: 'dashboard', loadChildren:()=> import('./pages/dashboard/dashboard.module').then(m=> m.DashboardPageModule)},
  { path: 'payment', loadChildren:()=> import('./pages/payment/payment.module').then(m=> m.PaymentPageModule)},
  { path: 'cashprint', loadChildren:()=> import('./pages/cashprint/cashprint.module').then(m=> m.CashprintPageModule)},
  {
    path: 'receipthistory',
    loadChildren: () => import('./pages/receipthistory/receipthistory.module').then( m => m.ReceipthistoryPageModule)
  },
  {
    path: 'selectapp',
    loadChildren: () => import('./selectapp/selectapp.module').then( m => m.SelectappPageModule)
  },


]; 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
