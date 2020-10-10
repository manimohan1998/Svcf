import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriberRecepitPageRoutingModule } from './subscriber-recepit-routing.module';

import { SubscriberRecepitPage } from './subscriber-recepit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubscriberRecepitPageRoutingModule
  ],
  declarations: [SubscriberRecepitPage]
})
export class SubscriberRecepitPageModule {}
