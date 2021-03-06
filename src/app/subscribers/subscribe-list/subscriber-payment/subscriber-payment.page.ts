import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Router, ActivatedRoute,NavigationExtras} from'@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { SubscriberApiService } from '../../subscriber-api.service';
import 'moment/locale/pt-br';
import * as moment from 'moment';

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
  constructor(private formBuilder: FormBuilder,public toastController: ToastController, public subscribeServ: SubscriberApiService, private router:Router,public route: ActivatedRoute,public loadingController: LoadingController) {
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
alert(error.description + ' (Error '+error.code+')')
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
  let number=this.padLeadingZeros(this.count, 8);
  //  this.no=this.count
   this.vouchercounts=number
   let customer="C-"
   this.receiptno.push(customer+this.grandtotal[i].BranchPrefix+number)
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
    VoucherCount:this.vouchercounts  
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts 
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
    VoucherCount:this.vouchercounts
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
  this.subscribeServ.makepayment(this.cashdata1).subscribe(res=>{
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
    })
  
}
async presentToast(message) {
  const toast = await this.toastController.create({
      message: message,
      duration: 2000
   });
    toast.present();
}
padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}
}