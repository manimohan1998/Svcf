import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriberApiService } from '../../subscriber-api.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  payment_details: any=[];

  constructor(public subscribeServ: SubscriberApiService,private router:Router,public route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      console.log(params.states)
      if(params.states !=undefined){
      this.payment_details = JSON.parse(params.states);
      console.log(this.payment_details)
      for(let i=0;i<this.payment_details.listVou.length;i++){
         this.subscribeServ.receipt(this.payment_details.listVou[i]).subscribe(res=>{
            console.log(res)
         })
      }
   }

    })
  }

  ngOnInit() {
  }

}
