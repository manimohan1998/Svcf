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
        num +=Math.round( parseFloat(this.grandtotal[i].Debit))
        if ((num==0)){
          num = 0;
        this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(num);
        }
        this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(Math.round(this.grandtotal[i].Debit));
        nums1 +=Math.round( parseFloat( this.grandtotal[i].Debit))
        if ((nums1==0)){
          nums1=0;
          this.PaymentForm.get(['AmountDetails', i, 'Interest']).setValue(nums1);
          }
        this.PaymentForm.get(['AmountDetails', i, 'Interest']).setValue(Math.round(this.grandtotal[i].Debit));
        nums2 +=Math.round( parseFloat( this.grandtotal[i].NonPrizedArrier))
        if ((nums2==0)){
          nums2=0;
          this.PaymentForm.get(['AmountDetails', i, 'Arrearamount']).setValue(nums2);
          }
        console.log(this.grandtotal[i].NonPrizedArrier)
        this.PaymentForm.get(['AmountDetails', i, 'Arrearamount']).setValue(Math.round(this.grandtotal[i].Credit));
        this.num=num +nums1 + nums2;
        console.log(this.num)
     }
    }
   }
 
   total(){
   var nums=0
   var nums1=0
   var nums2=0
    for(let i=0;i<this.grandtotal.length;i++){
    nums += parseFloat(this.PaymentForm.get('AmountDetails').value[i].AmountPayable)
    if (!(nums>0)){
     nums=0
     this.PaymentForm.get(['AmountDetails', i, 'AmountPayable']).setValue(nums);
    }
    
      nums1 += parseFloat(this.PaymentForm.get('AmountDetails').value[i].Interest)
      nums2 += parseFloat(this.PaymentForm.get('AmountDetails').value[i].Arrearamount)
 
    this.num = nums +nums1 +nums2;
    
   }
  }
  
 
  AmountDetail():FormArray{
    return this.PaymentForm.get('AmountDetails') as FormArray
  }

  newArray():FormGroup{
    return this.formBuilder.group({
      AmountPayable: ['',Validators.compose([Validators.required,Validators.min(2000)])],
      Interest: ['',Validators.required],
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
  
    console.log(this.PaymentForm.value.AmountDetails);
    console.log(this.PaymentForm.get('AmountDetails').value)
    console.log(this.num)
    console.log(this.num * 100)
    // this.subscribeServ.makepayment(data).subscribe(res=>{
    //    console.log(res)
    // })
    this.payWithRazorpay()
    this.router.navigate(["subscribe-list/subscriber-recepit"])
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
  console.log(payment)
  this.router.navigate(["subscribe-list/subscriber-recepit"])

}
ngOnDestroy(){
  this.PaymentForm.reset();
}

  }


 

