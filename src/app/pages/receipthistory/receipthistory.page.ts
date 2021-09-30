import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {format} from "date-fns";
import { LoadingController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
selector: 'app-receipthistory',
templateUrl: './receipthistory.page.html',
styleUrls: ['./receipthistory.page.scss'],
})
export class ReceipthistoryPage implements OnInit {
receiptFormGroup: FormGroup;
value:any;
colid:any;
receipt_history:any=[];
length:any;
isLoading = false;
customernames:any=[];
receiptnum:any=[];
chitnum:any=[];
branchname:any=[];
show:boolean=false;
history_total:any;
history_tot:any;
	show1: boolean;
	grandtotal: any=[];
constructor(public fb: FormBuilder,private toast:Toast,public dashboardservice:DashboardService,public loadingController: LoadingController, private paymentservice:PaymentService,private router: Router,private route: ActivatedRoute) {
this.route.queryParams.subscribe(params => {
if (this.router.getCurrentNavigation().extras.state) {
this.value = this.router.getCurrentNavigation().extras.state.user;
}
})
this.colid=localStorage.getItem('col_id')
}
ionViewWillEnter(){
	    this.receiptFormGroup.reset();

	this.receipt_history=[];
this.show=false;
this.show1=true;
}
ngOnInit() {
		this.receipt_history=[];
this.show=false;

this.receiptFormGroup = this.fb.group({
from_date: ['', Validators.required],
to_date: ['', Validators.required],

});
}
async history(dates){
	const loading = await this.loadingController.create({
		message: 'Please Wait',
		translucent: true,
	  });
	  await loading.present();
this.show=false;
this.receipt_history=[];
let token=localStorage.getItem("tokens");
let enddate=dates.to_date;
let startdate=dates.from_date;
console.log(enddate)
let start= format(new Date(startdate), "yyyy/MM/dd");
let end= format(new Date(enddate), "yyyy/MM/dd");
this.receiptFormGroup.value["from_date"] = moment(this.receiptFormGroup.value.from_date.toLocaleString()).format("MM/DD/YYYY");
this.receiptFormGroup.value["to_date"] = moment(this.receiptFormGroup.value.to_date.toLocaleString()).format("MM/DD/YYYY");
      if(start < end || start == end){
		  console.log(start,end)
this.paymentservice.receipthistory(this.colid,this.receiptFormGroup.value.from_date,this.receiptFormGroup.value.to_date,token).subscribe(res=>{
console.log(res)
if(res['length'] == 0){
	this.show=false;
	this.show1=false;
	loading.dismiss();
this.presentToast('No data available')
}
else{
	loading.dismiss();
	this.show1=true;
	this.show=true;
  this.receipt_history=res;
this.length=this.receipt_history.length
var num=0;
for(let i=0;i<this.receipt_history.length;i++){
	  this.receipt_history[i].total = this.receipt_history[i].total.replace(/,/g, '');

	  num+=(parseFloat( this.receipt_history[i].total))

	this.history_total=num;
	this.history_tot=Number(parseFloat(this.history_total).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
})
	console.log(this.history_tot)
}
this.grandtotal=this.history_tot.replace(/,/g, '');
}

},(error:HttpErrorResponse)=>{
	if(error.status ===401){    
		loading.dismiss();
	  this.presentToast("Session timeout, please login to continue.");
	  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
	  this.router.navigate(["/login"]);
   }
   else if(error.status ===400){   
	loading.dismiss();
    this.presentToast("Session timeout / Server Error! Please login again");
	this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
	})
    this.router.navigate(["/login"]);
 }
 
  } 
  )
	  }else{
		loading.dismiss();
		this.presentToast("Start date should be less than or equal to end date");
	  }
}
async presentToast(message) {
this.toast.show(message, '2000', 'bottom').subscribe(
toast => {
console.log(toast);
});
}
previous(){
this.router.navigateByUrl('dashboard')
}
async present() {
this.isLoading = true;
return await this.loadingController.create({
message: 'Loading,Please wait.....'
}).then(a => {
a.present().then(() => {
console.log('presented');
if (!this.isLoading) {
a.dismiss().then(() => console.log('abort presenting'));
}
});
});
}
async dismiss() {
this.isLoading = false;
return await this.loadingController.dismiss().then(() => console.log('dismissed'));
}
indianRupeeFormat(val: number) {
	return Number(val).toLocaleString('en-IN');
  }
}


export class AppDateAdapter extends NativeDateAdapter {
	format(date: Date, displayFormat: Object): any {
	  if (displayFormat === 'input') {
		let day: any = date.getDate().toString();
		day = +day < 10 ? '0' + day : day;
		let month: any = (date.getMonth() + 1).toString();
		month = +month < 10 ? '0' + month : month;
		let year = date.getFullYear();
		return `${day}-${month}-${year}`;
	  }
	  return date.toDateString();
	}
  }
  export const APP_DATE_FORMATS: MatDateFormats = {
	parse: {
	  dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
	},
	display: {
	  dateInput: 'input',
	  monthYearLabel: { year: 'numeric', month: 'numeric' },
	  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
	  },
	  monthYearA11yLabel: { year: 'numeric', month: 'long' },
	}
  };