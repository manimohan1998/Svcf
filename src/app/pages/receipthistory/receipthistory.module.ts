import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceipthistoryPageRoutingModule } from './receipthistory-routing.module';

import { ReceipthistoryPage } from './receipthistory.page';
import { MaterialModule } from '../../material/material.module';
import { Toast } from '@ionic-native/toast/ngx';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/receipthistory/receipthistory.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    ReceipthistoryPageRoutingModule
  ],
  declarations: [ReceipthistoryPage],
  providers:[Toast,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},]
})
export class ReceipthistoryPageModule {}
