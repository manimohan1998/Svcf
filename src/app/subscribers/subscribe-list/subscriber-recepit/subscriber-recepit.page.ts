import { Component, OnInit } from '@angular/core';
import { SubscriberApiService } from '../../subscriber-api.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {format} from "date-fns";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-subscriber-recepit',
  templateUrl: './subscriber-recepit.page.html',
  styleUrls: ['./subscriber-recepit.page.scss'],
})
export class SubscriberRecepitPage implements OnInit {
  
  data=['https://www.lifewire.com/thmb/1na-tdifkQUT1obPOp7r0AwP2Bc=/1373x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ScreenShot2020-04-20at10.06.28AM-69855f4797cb4be4bbed72f51dff1ab5.jpg',
'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=401&q=80']
  
public sendTo   : any; 
  public subject  : string = 'Message from Social Sharing App';
   payment_details: any=[];
   dateform: FormGroup;
   currentdate:string;
   receiptdata: any=[];
   arrearamount: number;
   arrears: any=[];
   grandtotal: number;
   arrearamount1: number;
   arrears1: any=[];
   show: boolean;




  constructor(public subscribeServ: SubscriberApiService,private socialshare:SocialSharing,
    private router:Router,public route: ActivatedRoute,private fb:FormBuilder,public toastController: ToastController) { 
   
    this.dateform = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      });
  }
 
  ngOnInit() {
 
  
  }
  ionViewWillEnter(){
   this.show=false
   this.presentToast1("Click to select start date and end date to filter your receipts")
  }
  back(){
this.router.navigate(["/subscribe-list"])
  }
  datefilter(dates){
     this.show=true;
   this.arrears=[]
    let enddate=dates.enddate;
    let startdate=dates.enddate;
   let start= format(new Date(enddate), "yyyy/MM/dd");
   let end= format(new Date(startdate), "yyyy/MM/dd");
console.log(start,end)
let customerid=localStorage.getItem("memberid")
this.subscribeServ.receipthistory(start,end,customerid).subscribe(res=>{
   console.log(res)
   this.receiptdata=res["AllReceipts"]
   console.log(this.receiptdata)
   for(let j=0;j<this.receiptdata.length;j++){
     this.arrearamount=0;
     this.arrearamount +=(parseFloat(this.receiptdata[j].currentDue))
     this.arrears.push(this.arrearamount)
     console.log(this.arrears)
     for(let k=0;k<this.arrears.length;k++){
     this.grandtotal=this.arrears[k]
     }
    }
    for(let j=0;j<this.receiptdata.length;j++){
      this.arrearamount1=0;
      this.arrearamount1 +=(parseFloat(this.receiptdata[j].nonPrizedArrear))
      this.arrearamount1 +=(parseFloat(this.receiptdata[j].prizedArrear))
      this.arrears1.push(this.arrearamount1)
      console.log(this.arrears1)
    }
    if(Array.isArray(this.receiptdata) && this.receiptdata.length){

    }
    else{
      this.presentToast("No Data Found")
    }
})
  }
  async presentToast(message) {
   const toast = await this.toastController.create({
       message: message,
       duration: 2000
    });
     toast.present();
 }

 async presentToast1(message) {
   const toast = await this.toastController.create({
       message: message,
       duration: 2000
    });
     toast.present();
 }

shareViaEmail(img){
         this.socialshare.canShareViaEmail().then(() => {
            this.socialshare.shareViaEmail(img, this.subject, this.sendTo) .then((data) =>{
               console.log('Shared via Email');
            })
            .catch((err) =>{
               console.log('Not able to be shared via Email');
            });
         }).catch((err) =>{
            console.log('Sharing via Email NOT enabled');
         });
   }
   
shareViaapp(img){
      this.socialshare.canShareVia('whatsapp').then(() => {
         this.socialshare.shareViaWhatsApp( this.subject, null, img) .then((data) =>{
            console.log('Shared via whatsapp',data);
         })
         .catch((err) =>{
            console.log('Not able to be shared via whatsapp');
         });
      }).catch((err) =>{
         console.log('Sharing via whatsapp NOT enabled');
      });
   }
  
shareViaSMS(img) {
      this.socialshare.shareViaSMS(img, null)
         .then(() => {
            console.log('SMS works');
         }).catch(() => { 
            alert('Sharing via SMS Not enabled');
         });
   }
   
  }


