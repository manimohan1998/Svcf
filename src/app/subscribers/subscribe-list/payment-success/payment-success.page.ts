import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { SubscriberApiService } from '../../subscriber-api.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.page.html',
  styleUrls: ['./payment-success.page.scss'],
})
export class PaymentSuccessPage implements OnInit {
  payment_details: any=[];
  receiptdata: any=[];
  arrearamount: number=0;
  arrears: any=[];
  personaldetail: any=[];
  customername: any=[];

  constructor(public subscribeServ: SubscriberApiService,private router:Router,public route: ActivatedRoute,
    public loadingController: LoadingController,private platform: Platform) {
    
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params.states)
  //     if(params.states !=undefined){
  //       this.receiptdata=[]
  //     this.payment_details = JSON.parse(params.states);
  //     console.log(this.payment_details)
  //  this.method(this.payment_details);
  //   }
     
  //   })


  }
ionViewWillEnter(){
  this.platform.backButton.subscribeWithPriority(1, () => {
    this.router.navigateByUrl('/subscribe-list')
       });
  this.receiptdata=[]
  this.payment_details=JSON.parse(localStorage.getItem("receipt"))
this.method(this.payment_details);
}

async  method(data) {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();
    for(let i=0;i<data.listVou.length;i++){
      this.subscribeServ.receipt(this.payment_details.listVou[i]).subscribe(res=>{
         console.log(res)
         loading.dismiss();
         this.receiptdata.push(res["lstReceipt"])
         console.log(this.receiptdata)
         if(Array.isArray(this.receiptdata) && this.receiptdata.length){
           this.arrearamount +=(parseFloat(this.receiptdata[i][0].NPArrear))
           this.arrearamount +=(parseFloat(this.receiptdata[i][0].PArrear))
           this.arrears.push(this.arrearamount)
           this.arrearamount=0;
         }
       })
      }
  }

  ngOnInit() {
  }

  paymentsuccess(){
    this.router.navigate(["/subscribe-list"])
  }
  previous(){
    this.router.navigate(["/subscribe-list"])
  }
}
