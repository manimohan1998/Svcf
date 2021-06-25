import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
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
  pagname: any;

  constructor(public subscribeServ: SubscriberApiService,private router:Router,public route: ActivatedRoute,
    public loadingController: LoadingController,private platform: Platform,public toastController: ToastController) {
    
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
  this.pagname=localStorage.getItem("whichpage")
  this.platform.backButton.subscribeWithPriority(1, () => {
    this.router.navigateByUrl(this.pagname)
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
    let token=localStorage.getItem("token")
    for(let i=0;i<data.listVou.length;i++){
      this.subscribeServ.receipt(this.payment_details.listVou[i],token).subscribe(res=>{
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
       }
       ,(error:HttpErrorResponse)=>{
        if(error.status ===401){       
          loading.dismiss();   
          this.presentToast("Session timeout, please login to continue.");
          this.router.navigate(["/login"]);
       }
       else if(error.status ===400){     
        loading.dismiss();   
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
      } })
      }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
  }
  ngOnInit() {
  }

  paymentsuccess(){
    this.router.navigate([this.pagname])
  }
  previous(){
    this.router.navigate([this.pagname])
  }
}
