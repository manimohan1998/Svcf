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
  num: number;
  storepayment: any;
  payment_detail: { Chitnumber: any; MemberId: string; PayableAmount: any; ArrierAmount: any; InterestAmount: number; Prized: any; Branch: any; Current_insta_no: any; };

  constructor(private formBuilder: FormBuilder, public subscribeServ: SubscriberApiService, private router:Router,public route: ActivatedRoute) {
   this.route.queryParams.subscribe(params => {
     console.log(params.payment)
     this.payment_details = JSON.parse(params.payment);
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
  back(){
    this.router.navigate(["/subscribe-list"])
      }
  addmethod() {
    this.grandtotal=this.payment_details
    // console.log(this.grandtotal,"hi")
    var num = 0;
    var nums1=0;
    var nums2=0;
  for(let i=0;i<this.grandtotal.length;i++){
   
       if(this.grandtotal[i].Debit){
   
        num +=( parseFloat(this.grandtotal[i].Debit))
        this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(parseFloat(this.grandtotal[i].Debit));
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
  
}
 
  //  total(){
  //  var nums=0
  //  var nums1=0
  //  var nums2=0
  //   for(let i=0;i<this.grandtotal.length;i++){
  //   nums += parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)
  //   if (!(nums>0)){
  //    nums=0
  //    this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(nums);
  //   }
    
  //     nums1 += parseFloat(this.PaymentForm.get('AmountDetails').value[i].Interest)
  //     nums2 += parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)
 
  //   this.num = nums +nums1 +nums2;
    
  //  }
  // }
  
 
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
this.payment_details.splice(0,this.payment_details.length)
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
    if(this.grandtotal[i].Debit){
      let arrearamount=this.grandtotal[i].IsPrized=="Y"? this.grandtotal[i].PrizedArrier:this.grandtotal[i].NonPrizedArrier
      this. payment_detail={Chitnumber :this.grandtotal[i].ChitNo,
        MemberId:mem_id,PayableAmount :this.grandtotal[i].Debit,
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
  this.payment_details.splice(0,this.payment_details.length)
}

  }


 

