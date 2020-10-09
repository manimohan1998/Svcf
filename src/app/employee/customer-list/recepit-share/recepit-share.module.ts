import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepitSharePageRoutingModule } from './recepit-share-routing.module';

import { RecepitSharePage } from './recepit-share.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepitSharePageRoutingModule
  ],
  declarations: [RecepitSharePage]
})
export class RecepitSharePageModule {}
