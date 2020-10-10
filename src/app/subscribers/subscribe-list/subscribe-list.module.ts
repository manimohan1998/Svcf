import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscribeListPageRoutingModule } from './subscribe-list-routing.module';

import { SubscribeListPage } from './subscribe-list.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SubscribeListPageRoutingModule
  ],
  declarations: [SubscribeListPage]
})
export class SubscribeListPageModule {}
