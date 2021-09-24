import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PaymentService } from '../../../services/payment.service';
import { AlertController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
selector: 'app-payment',
templateUrl: './cash.page.html',
styleUrls: ['../payment.page.scss'],
})
export class CashPage implements OnInit {
today = Date.now();
cashForm: FormGroup;
i_name: any;
cash_details: any = [];
i_details: any;
i_grpid: any;
chit_value: any;
edit_details: any;
cash_array: any;
is: any;
is_array: any;
brid: any;
brid1: any = [];
linesFormArray:any;
new_check:any;
test:boolean=false;
sum:any;
index_value:any=[];
final_total:any;
grandtotal:any;
message:any;
grandtotal1:any;
  userdata: any;
  totals: number;
  todayvalue: any;
  todaypaidamount: any;
  total1: boolean;
constructor(private route: ActivatedRoute,public dashboardservice:DashboardService,private toast:Toast,public alertController: AlertController, private router: Router, private fb: FormBuilder, public paymentservice: PaymentService) {
this.route.queryParams.subscribe(params => {
if (this.router.getCurrentNavigation().extras.state) {
this.is = this.router.getCurrentNavigation().extras.state.user7;
this.is_array = this.router.getCurrentNavigation().extras.state.user8;
}
})
this.route.queryParams.subscribe(params => {
this.i_details = JSON.parse(params.state)
console.log(this.i_details)
for (let i = 0; i < this.i_details.length; i++) {
this.brid = (this.i_details[i].BranchID);
this.brid1.push(this.brid);
}
this.chit_value = this.i_details.Chitvalue;
})
}
ngOnInit() {

this.cashForm = new FormGroup({
formArrayName: this.fb.array([])
})
this.buildForm();
}
buildForm() {
const controlArray = this.cashForm.get('formArrayName') as FormArray;
Object.keys(this.i_details).forEach((i) => {
  if(this.i_details[i].TotalPayable != 0){

    controlArray.push(
this.fb.group({
branchprefix: new FormControl(this.i_details[i].BranchPrefix, Validators.required),
branchname: new FormControl(this.i_details[i].Branch, Validators.required),
groupno: new FormControl(this.i_details[i].groupno, Validators.required),
totalchit: new FormControl(this.i_details[i].totalchitvalue, Validators.required),
branchid: new FormControl(this.i_details[i].BranchID, Validators.required),
memberid: new FormControl(this.i_details[i].Mid, Validators.required),
m_id: new FormControl(this.i_details[i].MemberID, Validators.required),
rootid: new FormControl(this.i_details[i].rootid, Validators.required),
headid: new FormControl(this.i_details[i].headID, Validators.required),
chitgroupid: new FormControl(this.i_details[i].chitgroupid, Validators.required),
installment: new FormControl(this.i_details[i].instno, Validators.required),
agreement: new FormControl(this.i_details[i].agreementno, Validators.required),
amountreceived: new FormControl(this.i_details[i].CurrentDueAmount),
prizedarrear: new FormControl(this.i_details[i].PrizedArrear,Validators.required),
nonprizedarrear: new FormControl(this.i_details[i].NonPrizedArrear,Validators.required),
interest: new FormControl('', Validators.compose([

Validators.pattern('[. , 0-9 ]*')
])),
otheramount: new FormControl('', Validators.compose([
Validators.pattern('[. , 0-9 ]*')
])),
amountpayable: new FormControl('', Validators.compose([
Validators.required,Validators.pattern('^[1-9][. , 0-9]*$')
])),
})

)
  }
  else{
    
    controlArray.push(
this.fb.group({
branchprefix: new FormControl(this.i_details[i].BranchPrefix, Validators.required),
branchname: new FormControl(this.i_details[i].Branch, Validators.required),
groupno: new FormControl(this.i_details[i].chitgroupno, Validators.required),
totalchit: new FormControl(this.i_details[i].totalchitvalue, Validators.required),
branchid: new FormControl(this.i_details[i].BranchID, Validators.required),
memberid: new FormControl(this.i_details[i].Mid, Validators.required),
m_id: new FormControl(this.i_details[i].MemberID, Validators.required),
rootid: new FormControl(this.i_details[i].rootid, Validators.required),
headid: new FormControl(this.i_details[i].headID, Validators.required),
chitgroupid: new FormControl(this.i_details[i].chitgroupid, Validators.required),
installment: new FormControl(this.i_details[i].instno, Validators.required),
agreement: new FormControl(this.i_details[i].agreementno, Validators.required),
amountreceived: new FormControl(this.i_details[i].CurrentDueAmount),
prizedarrear: new FormControl(this.i_details[i].PrizedArrear,Validators.required),
nonprizedarrear: new FormControl(this.i_details[i].NonPrizedArrear,Validators.required),
interest: new FormControl('', Validators.compose([

Validators.pattern('[. , 0-9 ]*')
])),
otheramount: new FormControl('', Validators.compose([
Validators.pattern('[. , 0-9 ]*')
])),
amountpayable: new FormControl('', Validators.compose([

])),
// narration: new FormControl('',Validators.required),
})

)
  }

})
}


async presentToast(message) {
this.toast.show(message, '2000', 'bottom').subscribe(
toast => {
console.log(toast);
});
}
check(){
console.log(this.cashForm.value.interest)
}
submit(c) {
    this.new_check=c.formArrayName;
      console.log(this.new_check)

      var num=0;
this.final_total = this.new_check.map(function(el) {
var o = Object.assign({}, el);
o.total = +el.amountpayable.replace(/,/g,'') + +el.interest.replace(/,/g,'') + +el.otheramount.replace(/,/g,'');
return o;
})
for (let i=0;i<this.final_total.length;i++){
  num+=(parseFloat( this.final_total[i].total))
  this.grandtotal=num;
  this.grandtotal1=Number(parseFloat(this.grandtotal).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
})
  }
      
console.log(this.grandtotal1)
if(this.grandtotal == 0){
  this.presentToast('Please check values before submitting');
  
}
else{
  let token1=localStorage.getItem("tokens");
  this.userdata=JSON.parse(localStorage.getItem("user2"))
  let id=this.userdata["MemberID"]
  
  this.totals=0;
  this.todayvalue=this.grandtotal1
  this.paymentservice.toddayamount(id,token1).subscribe(res=>{
    this.todaypaidamount= res
    console.log(this.todaypaidamount)
if(this.todaypaidamount>-1){
    this.totals +=parseFloat (this.todaypaidamount)
    this.totals += parseFloat(this.todayvalue.replace(/,/g,''))
    console.log(this.totals)
    if(this.totals<200000){
    this.total1=true
    this.presentAlertConfirm(c,this.grandtotal1);
    }
    else{
      this.total1=false
      this.presentAlertConfirm2();
    }
  }
  console.log(this.total1)
}
,(error:HttpErrorResponse)=>{
  if(error.status ===401){    
    this.presentToast("Session timeout, please login to continue.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){    
  this.presentToast("Session timeout / Server Error! Please login again");
  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
  })
  this.router.navigate(["/login"]);
}

})

}
}

async presentAlertConfirm2() {
  const alert = await this.alertController.create({
  message: 'You have exceeded the Cash limit of ₹2 lakh/day',
  buttons: [
  {
  text: 'Cancel',
  role: 'cancel',
  cssClass: 'secondary',
  handler: (blah) => {
  }
  }, {
  text: 'Ok',
  role: 'cancel',
  handler: () => {
  }
  }
  ]
  });
  await alert.present();
  }

previous(){
  this.router.navigateByUrl('payment')
}
logout() {
this.presentAlertConfirm1();
}
async presentAlertConfirm(c,x) {
  console.log(x)
const alert = await this.alertController.create({
message: 'You have entered a grand total of ₹'+x,
buttons: [
{
text: 'Cancel',
role: 'cancel',
cssClass: 'secondary',
handler: (blah) => {
}
}, {
text: 'Proceed',
handler: () => {

this.cash_array = c.formArrayName;
let navigationExtras: NavigationExtras = {
state: {
user6: this.cash_array,
user10: this.i_details
}
};
localStorage.setItem("totalamounts",this.grandtotal1)
this.router.navigate(['payment/cashpay'], navigationExtras);
}
}
]
});
await alert.present();
}
async presentAlertConfirm1() {
const alert = await this.alertController.create({
message: 'Are you sure you want to logout?',
buttons: [
{
text: 'Cancel',
role: 'cancel',
cssClass: 'secondary',
handler: (blah) => {
}
}, {
text: 'Logout',
handler: () => {
  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
  })
this.router.navigate(['login']);
localStorage.clear();
}
}
]
});
await alert.present();
}

CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}
indianRupeeFormat(val: number) {
  return Number(val).toLocaleString('en-IN');
}
}