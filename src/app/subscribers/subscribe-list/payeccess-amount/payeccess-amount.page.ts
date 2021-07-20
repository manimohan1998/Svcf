import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { SubscriberApiService } from '../../subscriber-api.service';

@Component({
  selector: 'app-payeccess-amount',
  templateUrl: './payeccess-amount.page.html',
  styleUrls: ['./payeccess-amount.page.scss'],
})
export class PayeccessAmountPage implements OnInit {

  payment_details:any=[];
  formcount:any=[];
  PaymentForm:FormGroup;
  grandtotal:any=[];
  personal:any=[];
  num: number=0;
  total_details:any=[];
  storepayment: any;
  payment_detail: { Chitnumber: any; MemberId: string; PayableAmount: any; ArrierAmount: any; InterestAmount: number; Prized: any; Branch: any; Current_insta_no: any; };
  total: number;
  data1: number;
  data2: number;
  // newly added
  arrearamount: number;
  Amounts: number;
  payamount:number;
  // day:number;
  // month:number;
  // year:number;
  currentdate:string;
  storepayment1: any;
  carddata:any;
  storepayment2: any;
  storepayment3: any;
  array:any=[];
  nedate:any;
  day:any;
  month:any;
  year:any;
  card:any;
  card1:any;
  final:any;
  final1:any;
  finals:any;
  vouchercounts:any;
  count: number=0;
  data3: number;

  getvouchercount:any=[];
  payment_data:any=[];
  cashdata:any=[];
  cashdata1:any;
  receiptno:any=[];
  receiptletters: any=[];
  Receipt_code: any;
  todaypaidamount: any;
totals: number;
enteramount: any;
enteramounts: any=[];
constructor(private formBuilder: FormBuilder,public toastController: ToastController, public subscribeServ: SubscriberApiService, private router:Router,public route: ActivatedRoute,public loadingController: LoadingController,
  public platform:Platform,public alertController: AlertController,private webIntent: WebIntent) {
  this.route.queryParams.subscribe(params => {
    this.payment_details = JSON.parse(params.state);
         console.log(this.payment_details) 
         this.payment();    
  })
  this.PaymentForm = this.formBuilder.group({
    AmountDetails:this.formBuilder.array([])
  });

 
}
  payment() {
    const arr = this.PaymentForm.controls.AmountDetails as FormArray;
    while (0 !== arr.length) {
      arr.removeAt(0);
}
    console.log(this.payment_details?.length)
for( let i = 0; i < this.payment_details?.length; i++){
this.AmountDetail();
this.addrow();
this.newArray();
}
this.addmethod();
  }
ngOnInit() {
}
//  ionViewWillEnter(){
// }

ionViewDidEnter(){

}
back(){
  if(localStorage.getItem("excesspage")=="subscribelist"){
    this.router.navigate(["/subscribe-list"])
  }else{
    this.router.navigate(["/subscribe-list/payforothers"]);
  }

  }
addmethod() {
this.grandtotal=this.payment_details
var num = 0;
this.total_details=[];
for(let i=0;i<this.grandtotal.length;i++){
  this.data1=0;
  this.total=0;
  this.data1=parseFloat(this.PaymentForm.get('AmountDetails').value[i].extraamount)
  if(this.data1>0){
    alert("hi")
    console.log(this.data1)
    this.total += this.data1
    this.total_details.push(this.total)
    console.log( this.total_details)
  }else{
    this.data1=0
    this.total += this.data1
    this.total_details.push(this.total)
    console.log( this.total_details)
  }
  
}

function colName(n) {
  var ordA = 'a'.charCodeAt(0);
  var ordZ = 'z'.charCodeAt(0);
  var len = ordZ - ordA + 1;

  var s = "";
  while(n >= 0) {
      s = String.fromCharCode(n % len + ordA) + s;
      n = Math.floor(n / len) - 1;
  }
  return s;
}

// Example:
this.receiptletters=[]
for(let n = 0; n < 18278; n++){
  var val=  colName(n)
  this.receiptletters.push(val)
}
console.log(this.receiptletters)
let token=localStorage.getItem('token')

this.subscribeServ.Vouchercode(token).subscribe(res=>{
console.log(res['VoucherCode'],"vouchercode")
this.Receipt_code=res['VoucherCode']
console.log(this.Receipt_code)
},(error:HttpErrorResponse)=>{
if(error.status ===401){    
  this.presentToast("Session timeout, please login to continue.");
  this.router.navigate(["/login"]);
}
else if(error.status ===400){    
this.presentToast("Server Error! Please try login again.");
this.router.navigate(["/login"]);
}
else{
this.presentToast("Server Error! Please try login again.");
this.router.navigate(["/login"]);
}
})

}

AmountDetail():FormArray{
return this.PaymentForm.get('AmountDetails') as FormArray
}

newArray():FormGroup{
return this.formBuilder.group({
  extraamount:['',[Validators.pattern("^[a-zA-Z0-9]+$")]],
  })
}
addrow(){
this.AmountDetail().push(this.newArray())
}
extraamount(i){
  if(this.PaymentForm.valid){
    if(this.PaymentForm.get('AmountDetails').value[i].extraamount){
      this.total_details[i]=parseFloat(this.PaymentForm.get('AmountDetails').value[i].extraamount)
    }else{
      this.total_details[i]=0
    }
  }else{
    this.total_details[i]=0
  }
  let sum: number = 0;
  this.total_details.forEach(a => sum += a);
  console.log(sum );
      this.num=sum
 }
erasedata(){
console.log(this.payment_details)
this.payment_details=[];
console.log(this.payment_details)
}
//   public submit() {
//    this.newcheck('8')
// }
submit(){
    //  this.newcheck('8')
    if(this.num>0){
      let memidnew=localStorage.getItem('exememberid')
      let token=localStorage.getItem('token')
      this.subscribeServ.duplicantpaymentdetails(token).subscribe(res=>{
        console.log(res)
        let balancetime=res['BalanceExpiration']
        console.log(balancetime)
        if(balancetime>300){
         this.check();
        }else{
          this.presentToast1("Session timeout, please login to continue.");
          this.router.navigate(["/login"]);
        }
      },(error:HttpErrorResponse)=>{
        if(error.status ===401){    
          this.presentToast("Session timeout, please login to continue.");
          this.router.navigate(["/login"]);
       }
       else if(error.status ===400){    
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
      }
      else{
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
       }
      })
    }else{
      this.presentToast1("Please Enter Valid Excess Amount");
    }


}

check(){
  this.totals=0
  let memidnew=localStorage.getItem('exememberid')
  let token=localStorage.getItem('token')
  this.subscribeServ.toddayamount(memidnew,token).subscribe(res=>{
    console.log(res["TotalPaidAmount"])
    this.todaypaidamount= res['TotalPaidAmount']
    this.enteramount=this.num
    if(this.todaypaidamount>-1){
      this.totals +=this.todaypaidamount
      this.totals += this.num
      console.log(this.totals)
      if(this.totals<200000){
      // this.payWithRazorpay()
      this.upialert()
      }
      else{
      this.presentAlertConfirm2();
      }
    }}
    ,(error:HttpErrorResponse)=>{
      if(error.status ===401){    
        this.presentToast("Session timeout, please login to continue.");
        this.router.navigate(["/login"]);
     }
     else if(error.status ===400){    
      this.presentToast("Server Error! Please try login again.");
      this.router.navigate(["/login"]);
    }
    else{
      this.presentToast("Server Error! Please try login again.");
      this.router.navigate(["/login"]);
     }
})
}

async presentAlertConfirm2() {
const alert = await this.alertController.create({
message: 'You have exceeded the Cash limit of ₹2 lakh/day',
buttons: [
 {
text: 'Ok',
role: 'cancel',
handler: () => {
}
}
]
});
await alert.present();
}

// payWithRazorpay(){
//   let amount=this.num*100;
//   var options = {
//   description: 'Credits towards consultation',
//   image: 'https://i.imgur.com/3g7nmJC.png',
//   currency: 'INR',
//   key:'rzp_test_j19AUM7dFqeMks',
//   amount:amount,
//   name: 'Acme Corp',
//   theme: {
//     color: '#3399cc'
//       }
//   }
// var successCallback = (success) =>{
// var paymentId = success.razorpay_payment_id
// var signature = success.razorpay_signature
// this.newcheck(paymentId); 


// }
// var cancelCallback = (error) =>{
// // alert(error.description + ' (Error '+error.code+')')
// alert(error.description)
// }
// RazorpayCheckout.on('payment.success', successCallback)
// RazorpayCheckout.on('payment.cancel', cancelCallback)
// RazorpayCheckout.open(options)
// }
async upialert(){
  
const alert =await this.alertController.create({
  message:'Make payment through available UPI',
  buttons: [{
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
     }
  },{
    text: 'Ok',
    handler: () =>{
      this.upiIntegraction()
    }
  }]
})

await alert.present();
}
upiIntegraction() {
const tid = this.getRandomString();
const orderId = this.getRandomString();
const totalPrice = 5.00;
const UPI_ID = 'gokuldsp01@oksbi';
const UPI_NAME = 'Gokul%20Gogul';
const UPI_TXN_NOTE = 'Finance%20Amount';
const url = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&tid=${tid}&am=${totalPrice}&cu=INR&tn=${UPI_TXN_NOTE}&tr=${orderId}`;
const options = {
  action: this.webIntent.ACTION_VIEW,
  url
};
console.log(options)
this.webIntent.startActivityForResult(options).then(success => {
  console.log(success);
  if (success.extras.Status == 'SUCCESS') {
    // SUCCESS RESPONSE
    this.paymentSuccess(orderId, 'UPI');
  } else if (success.extras.Status == 'SUBMITTED') {
    this.paymentSuccess(orderId, 'UPI');
    // SUBMITTED RESPONSE
  } else if (success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
    // FAILED RESPONSE
  } else {
    // FAILED RESPONSE
  }
}, error => {
  console.log(error);
});
}
getRandomString() {
const len = 10;
const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
let ans = '';
for (let i = len; i > 0; i--) {
  ans += arr[Math.floor(Math.random() * arr.length)];
}
return ans;
}
paymentSuccess(orderId: string, paymentMethod: string) {
alert(`Payment successful Order Id ${orderId} payment method ${paymentMethod}`);
this.newcheck(orderId); 
}
async newcheck(payment){
const loading = await this.loadingController.create({
  message: 'Please Wait',
  translucent: true,
});
await loading.present();
this.nedate = new Date();
this.day = moment(this.nedate.toLocaleString()).format("DD");
this.month = moment(this.nedate.toLocaleString()).format("MM");
this.year = moment(this.nedate.toLocaleString()).format("YYYY");

//this.day=d.getDate();
//this.month=d.getMonth()+1;
//this.year=d.getFullYear();
this.currentdate=this.month+"/"+this.day+"/"+this.year;
this.getvouchercount=(JSON.parse(localStorage.getItem("voucher")))
this.count=this.getvouchercount
console.log(this.getvouchercount)
this.personal=(JSON.parse(localStorage.getItem("exepersonaldatas")))
console.log(this.personal)
console.log(this.grandtotal,"ghjg")
for(let i=0;i<this.grandtotal.length;i++){
 //let receiptno= this.grandtotal[i].BranchName.substring(0,3).toUpperCase()
 let id=this.personal[0].MemberID
 this.count +=1
 if(this.count>9999999){
  this.count=1;
  this.Receipt_code +=1
 }
let number=this.padLeadingZeros(this.count, 7);
//  this.no=this.count
 this.vouchercounts=number
 let customer="C-PAL-"
 let receiptcount=this.receiptletters[this.Receipt_code].toUpperCase()
 this.receiptno.push(customer+receiptcount+number)
 console.log(this.receiptno)
}
this.enteramounts=[];
for(let i=0;i<this.grandtotal.length;i++){
  if(this.PaymentForm.get('AmountDetails').value[i].extraamount.length !=0){
  this.enteramounts.push(this.PaymentForm.get('AmountDetails').value[i].extraamount)
   }else{
     this.enteramounts.push(0)
   }}
for(let i=0;i<this.grandtotal.length;i++){
if(this.grandtotal[i].PrizedArrier != 0 ){

this.payment_data = [
{
  Amount: this.enteramounts[i],
  AppReceiptno: this.receiptno[i],
  BranchID:this.personal[0].BranchId,
  ChitGroupId:this.grandtotal[i].ChitGroupId,
  Head_Id:this.grandtotal[i].Head_Id,
  ISActive:true,
  IsAccepted:"0",
  IsDeleted:0,
  M_Id:this.personal[0].MemberIDNew, 
  MemberID: this.personal[0].MemberIDNew,
  MoneyCollId:this.grandtotal[i].MoneyCollId,
  
  Other_Trans_Type:1,
  ReceievedBy: "admin",
  RootID: "",
  Series:"CPAPP",
  T_Day: this.day,
  T_Month: this.month,
  T_Year: this.year,
  Trans_Medium:"0",
  Trans_Type: "1", 
  TransactionKey:0, 
  Type: "Card",
  Voucher_No:1000,
  Voucher_Type: "C",

  PArrear:this.grandtotal[i].PrizedArrier,
  NPArrear:this.grandtotal[i].NonPrizedArrier,
  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  //Interest:this.grandtotal[i].Interest,
  VoucherCount:this.vouchercounts,  
  VoucherCode:this.Receipt_code
},
{
  Amount:this.enteramounts[i],
  AppReceiptno: this.receiptno[i],
  BranchID:this.personal[0].BranchId,
  ChitGroupId:this.grandtotal[i].ChitGroupId,
  Head_Id:this.grandtotal[i].Head_Id,
  ISActive:true,
  IsAccepted:"0",
  IsDeleted:0,
  M_Id:this.personal[0].MemberIDNew, 
  MemberID: this.personal[0].MemberIDNew,
  MoneyCollId:this.grandtotal[i].MoneyCollId,
  
  Other_Trans_Type:1,
  ReceievedBy: "admin",
  RootID: "",
  Series:"CPAPP",
  
   T_Day: this.day,
  T_Month: this.month,
  T_Year: this.year,
  Trans_Medium:"0",
  Trans_Type: "1", 
  TransactionKey:0, 
  Type: "Card",
  Voucher_No:1000,
  Voucher_Type: "D",

  PArrear:this.grandtotal[i].PrizedArrier,
  NPArrear:this.grandtotal[i].NonPrizedArrier,
  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  //Interest:this.grandtotal[i].Interest,
  VoucherCount:this.vouchercounts,  
  VoucherCode:this.Receipt_code
  }
]
}
else if(this.grandtotal[i].NonPrizedArrier != 0){
  
this.payment_data = [
{
  Amount: this.enteramounts[i],
  AppReceiptno: this.receiptno[i],
  BranchID:this.personal[0].BranchId,
  ChitGroupId:this.grandtotal[i].ChitGroupId,
  Head_Id:this.grandtotal[i].Head_Id,
  ISActive:true,
  IsAccepted:"0",
  IsDeleted:0,
  M_Id:this.personal[0].MemberIDNew, 
  MemberID: this.personal[0].MemberIDNew,
  MoneyCollId:this.grandtotal[i].MoneyCollId,
  
  Other_Trans_Type:1,
  ReceievedBy: "admin",
  RootID: "",
  Series:"CPAPP",
  T_Day: this.day,
  T_Month: this.month,
  T_Year: this.year,
  Trans_Medium:"0",
  Trans_Type: "1", 
  TransactionKey:0, 
  Type: "Card",
  Voucher_No:1000,
  Voucher_Type: "C",

  PArrear:this.grandtotal[i].PrizedArrier,
  NPArrear:this.grandtotal[i].NonPrizedArrier,
  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  //Interest:this.grandtotal[i].Interest,
  VoucherCount:this.vouchercounts,  
  VoucherCode:this.Receipt_code
  },
{
  Amount:this.enteramounts[i],
  AppReceiptno: this.receiptno[i],
  BranchID:this.personal[0].BranchId,
  ChitGroupId:this.grandtotal[i].ChitGroupId,
  Head_Id:this.grandtotal[i].Head_Id,
  ISActive:true,
  IsAccepted:"0",
  IsDeleted:0,
  M_Id:this.personal[0].MemberIDNew, 
  MemberID: this.personal[0].MemberIDNew,
  MoneyCollId:this.grandtotal[i].MoneyCollId,
  
  Other_Trans_Type:1,
  ReceievedBy: "admin",
  RootID: "",
  Series:"CPAPP",
  T_Day: this.day,
  T_Month: this.month,
  T_Year: this.year,
  Trans_Medium:"0",
  Trans_Type: "1", 
  TransactionKey:0, 
  Type: "Card",
  Voucher_No:1000,
  Voucher_Type: "D",

  PArrear:this.grandtotal[i].PrizedArrier,
  NPArrear:this.grandtotal[i].NonPrizedArrier,
  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  //Interest:this.grandtotal[i].Interest,
  VoucherCount:this.vouchercounts,  
  VoucherCode:this.Receipt_code
  }
]
}
else{
this.payment_data = [
{
  Amount:this.enteramounts[i],
  AppReceiptno: this.receiptno[i],
  BranchID:this.personal[0].BranchId,
  ChitGroupId:this.grandtotal[i].ChitGroupId,
  Head_Id:this.grandtotal[i].Head_Id,
  ISActive:true,
  IsAccepted:"0",
  IsDeleted:0,
  M_Id:this.personal[0].MemberIDNew, 
  MemberID: this.personal[0].MemberIDNew,
  MoneyCollId:this.grandtotal[i].MoneyCollId,
  
  Other_Trans_Type:1,
  ReceievedBy: "admin",
  RootID: "",
  Series:"CPAPP",
  T_Day: this.day,
  T_Month: this.month,
  T_Year: this.year,
  Trans_Medium:"0",
  Trans_Type: "1", 
  TransactionKey:0, 
  Type: "Card",
  Voucher_No:1000,
  Voucher_Type: "C",

  PArrear:this.grandtotal[i].PrizedArrier,
  NPArrear:this.grandtotal[i].NonPrizedArrier,
  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  //Interest:this.grandtotal[i].Interest,
  VoucherCount:this.vouchercounts,  
  VoucherCode:this.Receipt_code
  },
{
  Amount:this.enteramounts[i],
  AppReceiptno: this.receiptno[i],
  BranchID:this.personal[0].BranchId,
  ChitGroupId:this.grandtotal[i].ChitGroupId,
  Head_Id:this.grandtotal[i].Head_Id,
  ISActive:true,
  IsAccepted:"0",
  IsDeleted:0,
  M_Id:this.personal[0].MemberIDNew, 
  MemberID: this.personal[0].MemberIDNew,
  MoneyCollId:this.grandtotal[i].MoneyCollId,
  
  Other_Trans_Type:1,
  ReceievedBy: "admin",
  RootID: "",
  Series:"CPAPP",
  T_Day: this.day,
  T_Month: this.month,
  T_Year: this.year,
  Trans_Medium:"0",
  Trans_Type: "1", 
  TransactionKey:0, 
  Type: "Card",
  Voucher_No:1000,
  Voucher_Type: "D",

  PArrear:this.grandtotal[i].PrizedArrier,
  NPArrear:this.grandtotal[i].NonPrizedArrier,
  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  //Interest:this.grandtotal[i].Interest,
  VoucherCount:this.vouchercounts,  
  VoucherCode:this.Receipt_code
  }
]

}
this.cashdata.push(this.payment_data);
console.log(this.cashdata,"cash")
this.cashdata1 = [].concat.apply([], this.cashdata);
for (let i = this.cashdata1.length - 1; i >= 0; --i) {
if (this.cashdata1[i].Amount == "0") {
this.cashdata1.splice(i, 1);
}
console.log(this.cashdata1,"intewre")
}
}
let token=localStorage.getItem("token")
this.subscribeServ.makepayment(this.cashdata1,token).subscribe(res=>{
   console.log(res)
   if(res){
    localStorage.setItem("receipt",JSON.stringify(res))
    this.router.navigate(["/subscribe-list/payment-success"])
    loading.dismiss()
    this.presentToast('Saved successfully')
   }
  //  let navigationExtras: NavigationExtras = {
  //    queryParams: { states:JSON.stringify(res)},
     
  //  };
  // this.router.navigate(["/subscribe-list/payment-success"],navigationExtras)
  },(error:HttpErrorResponse)=>{
    if(error.status ===401){     
      loading.dismiss()     
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){   
    loading.dismiss()     
    this.presentToast("Server Error! Please try login again.");
    this.router.navigate(["/login"]);
  } 

  else{
    loading.dismiss()
    this.presentToast("Server Error! Please try login again.");
    this.router.navigate(["/login"]);
   }})

}
async presentToast(message) {
const toast = await this.toastController.create({
    message: message,
    duration: 2000
 });
  toast.present();
}
async presentToast1(message) {
const toast = await this.toastController.create({
    message: message,
    duration: 3000
 });
  toast.present();
}
padLeadingZeros(num, size) {
var s = num+"";
while (s.length < size) s = "0" + s;
return s;
}
ionViewWillLeave(){
  this.payment_details=[];
  this.grandtotal=[];
  
}
}
