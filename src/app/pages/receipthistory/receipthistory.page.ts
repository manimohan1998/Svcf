import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { LoadingController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';
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
constructor(public fb: FormBuilder,private toast:Toast,public loadingController: LoadingController, private paymentservice:PaymentService,private router: Router,private route: ActivatedRoute) {
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
history(){

	this.receipt_history=[];
this.present();
let token=localStorage.getItem("tokens");
this.receiptFormGroup.value["from_date"] = moment(this.receiptFormGroup.value.from_date.toLocaleString()).format("MM/DD/YYYY");
this.receiptFormGroup.value["to_date"] = moment(this.receiptFormGroup.value.to_date.toLocaleString()).format("MM/DD/YYYY");

const strtdate = new Date(this.receiptFormGroup.value["from_date"]);
   const eddate = new Date(this.receiptFormGroup.value["to_date"]);
      if(strtdate < eddate){
this.paymentservice.receipthistory(this.colid,this.receiptFormGroup.value.from_date,this.receiptFormGroup.value.to_date,token).subscribe(res=>{
this.dismiss();
console.log(res)
if(res['length'] == 0){
	this.show=false;
	this.show1=false;
this.presentToast('No data available')
}
else{
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
}
},(error:HttpErrorResponse)=>{
	if(error.status ===401){    
	   this.dismiss();       
	  this.presentToast("Session timeout, please login to continue.");
	  this.router.navigate(["/login"]);
   }
   else if(error.status ===400){   
	this.dismiss();        
    this.presentToast("Server Error! Please try login again.");
    this.router.navigate(["/login"]);
 }
 
  } )
	  }else{
		this.dismiss();
		this.presentToast("Start date should be less than end date");
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