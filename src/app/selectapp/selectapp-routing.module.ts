import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectappPage } from './selectapp.page';

const routes: Routes = [
  {
    path: '',
    component: SelectappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectappPageRoutingModule {}
