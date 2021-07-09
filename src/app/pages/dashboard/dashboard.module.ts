import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { SearchPipe } from '../../shared/search.pipe';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage,SearchPipe]
})
export class DashboardPageModule {}
