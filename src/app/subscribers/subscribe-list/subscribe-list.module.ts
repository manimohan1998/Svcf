import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribeListPageRoutingModule } from './subscribe-list-routing.module';
import { FormsModule } from '@angular/forms';

import { SubscribeListPage } from './subscribe-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SubscribeListPageRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  declarations: [SubscribeListPage]
})
export class SubscribeListPageModule {}
