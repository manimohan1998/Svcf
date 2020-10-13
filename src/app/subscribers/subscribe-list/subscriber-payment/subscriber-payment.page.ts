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
  formcount:any;
  payment_details:[]=[];
  PaymentForm:FormGroup;

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
  ngOnInit(): void {
   console.log(this.formcount)
   for( let i=0;i<this.formcount;i++){
    this.AmountDetails()
    this.addrow();
    this.newArray();
   }
  }

 
  AmountDetails():FormArray{
    return this.PaymentForm.get('AmountDetails') as FormArray
  }

  newArray():FormGroup{
    return this.formBuilder.group({
      AmountReceived: ['', [Validators.required, Validators.maxLength(100)]],
      interest: ['', [Validators.required, Validators.maxLength(100)]],
      OtherAmount: ['', [Validators.required, Validators.maxLength(100)]],
      Narrations: [   
            '',
            [Validators.required, Validators.maxLength(100)]
          ]
       })
  }
  addrow(){
    this.AmountDetails().push(this.newArray())

}
// removeRow(i){
//   this.AmountDetails().removeAt(i);
// }

  public submit() {
    console.log(this.PaymentForm.value.AmountDetails);
    // this.subscribeServ.makepayment(data).subscribe(res=>{
    //    console.log(res)
    // })
    this.payWithRazorpay()
    this.router.navigate(["subscribe-list/subscriber-recepit"])
}
payWithRazorpay(){
  var options = {
  description: 'Credits towards consultation',
  image: 'https://i.imgur.com/3g7nmJC.png',
  currency: 'INR',
  key:'rzp_test_j19AUM7dFqeMks',
  amount:'5000',
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

  }


 

