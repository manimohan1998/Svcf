import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
<<<<<<< HEAD
import {Router} from'@angular/router';

=======
import { SubscriberApiService } from '../../subscriber-api.service';
>>>>>>> 585644e21c0a432771f2b07109fb1c1cd09df5b9
@Component({
  selector: 'app-subscriber-payment',
  templateUrl: './subscriber-payment.page.html',
  styleUrls: ['./subscriber-payment.page.scss'],
})
export class SubscriberPaymentPage implements OnInit {
val=5;
  PaymentForm:FormGroup;
<<<<<<< HEAD
  constructor(private formBuilder: FormBuilder, private router:Router) {
=======
  constructor(private formBuilder: FormBuilder, public subscribeServ: SubscriberApiService) {
>>>>>>> 585644e21c0a432771f2b07109fb1c1cd09df5b9
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
// removeRow(i){
//   this.AmountDetails().removeAt(i);
// }

  public submit() {
   console.log(this.PaymentForm.value.AmountDetails);
   // this.subscribeServ.makepayment(data).subscribe(res=>{
    //    console.log(res)
    // })
    this.router.navigate(["subscribe-list/subscriber-recepit"])

}
  }


 

