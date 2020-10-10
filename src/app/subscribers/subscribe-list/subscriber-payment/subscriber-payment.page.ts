import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-subscriber-payment',
  templateUrl: './subscriber-payment.page.html',
  styleUrls: ['./subscriber-payment.page.scss'],
})
export class SubscriberPaymentPage implements OnInit {
val=2;
  PaymentForm:FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.PaymentForm = this.formBuilder.group({
     
      AmountDetails:this.formBuilder.array([])
    
    });
  }
  ngOnInit(): void {
   console.log(this.val)
   for( let i=0;i<this.val;i++){
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
removeRow(i){
  this.AmountDetails().removeAt(i);
}

  public submit() {
    console.log(this.PaymentForm.value.AmountDetails);
 

}
  }


 

