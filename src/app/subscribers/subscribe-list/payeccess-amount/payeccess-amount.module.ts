import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayeccessAmountPageRoutingModule } from './payeccess-amount-routing.module';

import { PayeccessAmountPage } from './payeccess-amount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayeccessAmountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PayeccessAmountPage]
})
export class PayeccessAmountPageModule {}
