import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {Router, ActivatedRoute} from'@angular/router';

import { SubscriberApiService } from '../../subscriber-api.service';

declare var RazorpayCheckout: any; 

@Component({
  selector: 'app-subscriber-payment',
  templateUrl: './subscriber-payment.page.html',
  styleUrls: ['./subscriber-payment.page.scss'],
})
export class SubscriberPaymentPage implements OnInit {

  payment_details:[]=[];
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
  day:number;
  month:number;
  year:number;
  currentdate:string;
  storepayment1: any;
  storepayment2: any;
  storepayment3: any;
  array:any=[];
  receiptno:any;
  card:any;
  card1:any;
  final:any;
  final1:any;
  finals:any;
  vouchercounts:any;
  
payment_data:{Amount: any;AppReceiptno: String;BranchID: any;ChitGroupId: any; Head_Id: any;ISActive: any;IsAccepted: any; IsDeleted: any;
  M_Id: any; MemberID: any; MoneyCollId: any;Narration: any;Other_Trans_Type:any;ReceievedBy: any;RootID: any;Series:any;T_Day: any;
  T_Month: any;T_Year: any;Trans_Medium:any; Trans_Type: any; TransactionKey: any; Type: any; Voucher_No:any; Voucher_Type: any;CurrDate:any;ChoosenDate:any;
CreatedDate:any;ModifiedDate:any;LoginIp:any;ChequeDDNo:any;PArrear:any;NPArrear:any;CurrentDue:any;Interest:any;VoucherCount:any;};
  personaldetail: any;
// newly added
  constructor(private formBuilder: FormBuilder, public subscribeServ: SubscriberApiService, private router:Router,public route: ActivatedRoute) {
   this.route.queryParams.subscribe(params => {
     console.log(params.state)
     this.payment_details = JSON.parse(params.state);
     this.formcount=this.payment_details.length     
   })
    this.PaymentForm = this.formBuilder.group({
      AmountDetails:this.formBuilder.array([])
    });

  
}
  ngOnInit() {
   console.log(this.formcount)
   for( let i=0;i<this.formcount;i++){
    this.AmountDetail()
    this.addrow();
    this.newArray();
  
   }
 
  }
  ionViewWillEnter(){
    this.addmethod();
 }


// newly added
 ionViewDidEnter(){
    this.new();
  }
new() {
  this.receiptno=[];
  this.storepayment3=[];
 this.storepayment1=[];
 this.storepayment=[];
 this.card=[];
 this.card1=[];
 this.final=[];
 this.final1=[];
 this.finals=[];
 this.vouchercounts=[];
let d = new Date();
this.day=d.getDate();
this.month=d.getMonth()+1;
this.year=d.getFullYear();
this.currentdate=this.month+"/"+this.day+"/"+this.year;
this.personal=(JSON.parse(localStorage.getItem("personaldatas")))
console.log(this.personal)
for(let i=0;i<this.grandtotal.length;i++){
  this.vouchercounts=[]
  console.log( this.grandtotal[i].BranchName.substring(0,3).toUpperCase()) 
  let receiptno= this.grandtotal[i].BranchName.substring(0,3).toUpperCase()
  let id=this.personal[0].MemberID
  let count=i
  let no=count+1
  this.vouchercounts=no
  this.receiptno.push(receiptno+id+no)
  console.log(this.receiptno)
}

for(let i=0;i<this.grandtotal.length;i++){
  
  if(this.grandtotal[i].CurrentDueAmount){
   this.payamount=0;
   this.arrearamount=parseFloat(this.grandtotal[i].IsPrized=="Y"? this.grandtotal[i].PrizedArrier:this.grandtotal[i].NonPrizedArrier)
   this.Amounts=parseFloat(this.grandtotal[i].CurrentDueAmount)
   this.payamount +=this.arrearamount
   this.payamount +=this.Amounts
  
    this.payment_data={
      Amount: this.payamount,
      AppReceiptno: this.receiptno[i],
      BranchID:this.personal[0].BranchId,
      ChitGroupId: "",
      Head_Id: "",
      ISActive: this.personal[0].ISActive,
      IsAccepted:"0",
      IsDeleted:this.personal[0].IsDeleted,
      M_Id:this.personal[0].MemberID, 
      MemberID: this.personal[0].MemberID,
      MoneyCollId: "",
      Narration: "test",
      Other_Trans_Type:"1",
      ReceievedBy: "admin",
      RootID: "5",
      Series:"CPAPP",
      T_Day: this.day,
      T_Month: this.month,
      T_Year: this.year,
      Trans_Medium:"0",
      Trans_Type: "1", 
      TransactionKey: "0", 
      Type: "",
      Voucher_No:"1000",
      Voucher_Type: "",
      CurrDate:this.currentdate,
      ChoosenDate:this.currentdate,
      CreatedDate:this.currentdate,
      ModifiedDate:this.currentdate,
      LoginIp:"",
      ChequeDDNo:"",
      PArrear:this.grandtotal[i].PrizedArrier,
      NPArrear:this.grandtotal[i].NonPrizedArrier,
      CurrentDue:this.grandtotal[i].CurrentDueAmount,
      Interest:"0",
      VoucherCount:this.vouchercounts
    }
}
  this.storepayment1.push(this.payment_data)
  if(this.grandtotal.length===this.storepayment1.length){
this.method1(this.storepayment1);
  }
}
}
  method1(data) {
    this.storepayment2=data;
    console.log(this.storepayment2)
for(let i=0;i<this.storepayment2.length;i++){
if(this.storepayment2[i].Amount !=="0" && this.storepayment2[i].Interest ==="0" && this.storepayment2[i].Interest !==""){
  
  let filledArray = new Array(2).fill(this.storepayment2[i]);
  this.storepayment.push(filledArray)

    }
    if(this.storepayment2[i].Amount !=="0" && this.storepayment2[i].Interest !=="0"&& this.storepayment2[i].Interest !==""){
    let filledArray = new Array(4).fill(this.storepayment2[i]);
    this.storepayment3.push(filledArray)
     
      }
    }
 console.log(this.storepayment)
 console.log(this.storepayment3)
 
 for(let i=0;i<this.storepayment.length;i++){
  this.card1.push("C","D")
 }
 if(this.storepayment.length !=="0"){
  for(let i=0;i<this.storepayment.length;i++){
    this.final1.push( this.storepayment[i].map((o, i) => ({ ...o, Voucher_Type: this.card1[i], o,Type:"Card"})))
}
  }
  for(let i=0;i<this.storepayment3.length;i++){
    this.card.push("C","D")
   }
if(this.storepayment3.length !=="0"){
  for(let i=0;i<this.storepayment3.length;i++){
    this.final.push(this.storepayment3[i].map((o, i) => ({ ...o, Voucher_Type: this.card[i],o,Type:i>=2?"DefaultInterest":"Card"})))
   
}
  }
console.log(this.card)
console.log(this.card1)
console.log(this.storepayment3)
console.log(this.final)
console.log(this.final1)
if(this.final1.length !=="0" && this.final.length !=="0"){

  this.finals.push(this.final1)
  this.finals.push(this.final)
  
}
 else if(this.final1.length !=="0"){
  
  this.finals.push(this.final1[0])
}
 else if(this.final.length !=="0"){
 
  this.finals.push(this.final[0])
}



console.log(this.finals)
  }

// newly added




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
        this.num=num 
        console.log(this.num)
      
     }
     
        
    }
   
    this.total_details=[];
    for(let i=0;i<this.grandtotal.length;i++){
      this.data1=0;
      this.data2=0;
      this.total=0;
      this.data1=parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)
      this.data2 =parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)
      console.log(this.data1)
      this.total += this.data1
      this.total += this.data2
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


// removeRow(i){
//   this.AmountDetails().removeAt(i);
// }
 erasedata(){
   console.log(this.payment_details)
this.payment_details=[];
console.log(this.payment_details)
 }

  public submit() {
    this.payWithRazorpay()
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
var successCallback = function(success) {
var paymentId = success.razorpay_payment_id
var signature = success.razorpay_signature
this.makePayment(paymentId); 


}
var cancelCallback = function(error) {
alert(error.description + ' (Error '+error.code+')')
}
RazorpayCheckout.on('payment.success', successCallback)
RazorpayCheckout.on('payment.cancel', cancelCallback)
RazorpayCheckout.open(options)
}


makePayment(payment){
this.storepayment=[];
var mem_id=localStorage.getItem('memberid')
  for(let i=0;i<this.grandtotal.length;i++){
    if(this.grandtotal[i].CurrentDueAmount){
      let arrearamount=this.grandtotal[i].IsPrized=="Y"? this.grandtotal[i].PrizedArrier:this.grandtotal[i].NonPrizedArrier
      this. payment_detail={Chitnumber :this.grandtotal[i].ChitNo,
        MemberId:mem_id,PayableAmount :this.grandtotal[i].CurrentDueAmount,
        ArrierAmount  :arrearamount,
        InterestAmount:0,
        Prized:this.grandtotal[i].IsPrized,
        Branch :this.grandtotal[i].BranchName,
        Current_insta_no :this.grandtotal[i].Runningcall}
    }
  this.storepayment.push(this.payment_detail)
  this.subscribeServ.makepayment(this.storepayment).subscribe(res=>{
       console.log(res)
       console.log(payment)
       this.router.navigate(["subscribe-list/subscriber-recepit"])
    })
  }

}
ngOnDestroy(){
  this.PaymentForm.reset();
  this.payment_details=[];
}

  }


 

