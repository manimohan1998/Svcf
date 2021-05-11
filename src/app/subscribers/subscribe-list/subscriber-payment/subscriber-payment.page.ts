import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Router, ActivatedRoute,NavigationExtras} from'@angular/router';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { SubscriberApiService } from '../../subscriber-api.service';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

declare var RazorpayCheckout: any; 
@Component({
  selector: 'app-subscriber-payment',
  templateUrl: './subscriber-payment.page.html',
  styleUrls: ['./subscriber-payment.page.scss'],
})
export class SubscriberPaymentPage implements OnInit {
    payment_details:any=[];
    formcount:any;
    PaymentForm:FormGroup;
    grandtotal:any=[];
    personal:any=[];
    num: number;
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
  constructor(private formBuilder: FormBuilder,public toastController: ToastController, public subscribeServ: SubscriberApiService, private router:Router,public route: ActivatedRoute,public loadingController: LoadingController,
    public platform:Platform,public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.payment_details = JSON.parse(params.state);
           console.log(this.payment_details)
 
      this.formcount=this.payment_details.length     
    })
     this.PaymentForm = this.formBuilder.group({
       AmountDetails:this.formBuilder.array([])
     });
 
   
 }
 ngOnInit() {
}
ionViewWillEnter(){
console.log(this.formcount)
for( let i=0;i<this.formcount;i++){
this.AmountDetail()
this.addrow();
this.newArray();
}
}

ionViewDidEnter(){
  this.platform.backButton.subscribeWithPriority(1, () => {
    this.router.navigateByUrl('/subscribe-list')
       });
this.addmethod();
}
back(){
  this.router.navigate(["/subscribe-list"])
    }
addmethod() {
  this.grandtotal=this.payment_details
  var num = 0;
for(let i=0;i<this.grandtotal.length;i++){
 
     if(this.grandtotal[i].CurrentDueAmount){
 
      num +=( parseFloat(this.grandtotal[i].CurrentDueAmount))
      this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(parseFloat(this.grandtotal[i].CurrentDueAmount));
      if(this.grandtotal[i].IsPrized=="Y"){
       
        this.PaymentForm.get(['AmountDetails', i, 'Arrearamount']).setValue(parseFloat(this.grandtotal[i].PrizedArrier));
        num +=(parseFloat( this.grandtotal[i].PrizedArrier))
      }
       else {

        this.PaymentForm.get(['AmountDetails', i, 'Arrearamount']).setValue(parseFloat( this.grandtotal[i].NonPrizedArrier));
        num +=(parseFloat( this.grandtotal[i].NonPrizedArrier))
      }
      num +=(parseFloat(this.grandtotal[i].Interest))
      this.num=num 
      console.log(this.num)
    
   }
   
      
  }
 
  this.total_details=[];
  for(let i=0;i<this.grandtotal.length;i++){
    this.data1=0;
    this.data2=0;
    this.total=0;
    this.data3=0;
    this.data1=parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)
    this.data2 =parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)
    this.data3=parseFloat(this.grandtotal[i].Interest)
    console.log(this.data1)
    this.total += this.data1
    this.total += this.data2
    this.total += this.data3
    this.total_details.push(this.total)
    console.log( this.total_details)
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

})
}

AmountDetail():FormArray{
  return this.PaymentForm.get('AmountDetails') as FormArray
}

newArray():FormGroup{
  return this.formBuilder.group({
    AmountPayable: ['',Validators.required],
    Arrearamount: ['',Validators.required],
    })
}
addrow(){
  this.AmountDetail().push(this.newArray())
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
  let memidnew=localStorage.getItem('memberid')
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
  
})
}

  check(){
    this.totals=0
    let memidnew=localStorage.getItem('memberid')
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
        this.payWithRazorpay()
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

payWithRazorpay(){
  let amount=this.num*100;
  var options = {
  description: 'Credits towards consultation',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key:'rzp_test_j19AUM7dFqeMks',
  amount:amount,
  name: 'Acme Corp',
  theme: {
    color: '#3399cc'
      }
  }
var successCallback = (success) =>{
var paymentId = success.razorpay_payment_id
var signature = success.razorpay_signature
this.newcheck(paymentId); 


}
var cancelCallback = (error) =>{
// alert(error.description + ' (Error '+error.code+')')
alert(error.description)
}
RazorpayCheckout.on('payment.success', successCallback)
RazorpayCheckout.on('payment.cancel', cancelCallback)
RazorpayCheckout.open(options)
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
  this.personal=(JSON.parse(localStorage.getItem("personaldatas")))
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
   this.receiptno.push(customer+this.receiptletters[this.Receipt_code]+number)
   console.log(this.receiptno)
  }
  
  for(let i=0;i<this.grandtotal.length;i++){
     if(this.grandtotal[i].PrizedArrier != 0 ){
  
  this.payment_data = [
  {
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].PrizedArrier,
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
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].PrizedArrier,
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
    },
  {
    Amount: this.grandtotal[i].Interest,
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
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].Interest,
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
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
  //  CurrentDue:this.grandtotal[i].CurrentDueAmount,
  Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    }
  ]
  }
  else if(this.grandtotal[i].NonPrizedArrier != 0){
    
  this.payment_data = [
  {
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].NonPrizedArrier,
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
    Amount: +this.grandtotal[i].CurrentDueAmount+ +this.grandtotal[i].NonPrizedArrier,
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
    },
  {
    Amount: +this.grandtotal[i].Interest,
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
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
   },
  {
    Amount: this.grandtotal[i].Interest,
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
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    }
  ]
  }
  else{
  this.payment_data = [
  {
    Amount: this.grandtotal[i].CurrentDueAmount,
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
    Amount: this.grandtotal[i].CurrentDueAmount,
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
    },
  {
    Amount: this.grandtotal[i].Interest,
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
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "C",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
    VoucherCount:this.vouchercounts,  
    VoucherCode:this.Receipt_code
    },
  {
    Amount: this.grandtotal[i].Interest,
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
    Type: "DefaultInterest",
    Voucher_No:1000,
    Voucher_Type: "D",
  
    PArrear:this.grandtotal[i].PrizedArrier,
    NPArrear:this.grandtotal[i].NonPrizedArrier,
    //CurrentDue:this.grandtotal[i].CurrentDueAmount,
    Interest:this.grandtotal[i].Interest,
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
    } })
  
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
}