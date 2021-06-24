import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayforothersPageRoutingModule } from './payforothers-routing.module';

import { PayforothersPage } from './payforothers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayforothersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PayforothersPage]
})
export class PayforothersPageModule {}
