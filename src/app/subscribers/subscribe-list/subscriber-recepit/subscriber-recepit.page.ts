import { Component, OnInit } from '@angular/core';
import { SubscriberApiService } from '../../subscriber-api.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {format} from "date-fns";
import { Platform, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
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
   grandtotal: number=0;
   arrearamount1: number;
   arrears1: any=[];
   show: boolean;
   show1: boolean;




  constructor(public subscribeServ: SubscriberApiService,private socialshare:SocialSharing,
    private router:Router,public route: ActivatedRoute,private fb:FormBuilder,public toastController: ToastController,public platform:Platform) { 
   
    this.dateform = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      });
  }
 
  ngOnInit() {
 
  
  }
  ionViewWillEnter(){
   this.show=false
   this.show1=false;
  }
  back(){
this.router.navigate(["/subscribe-list"])
  }
  datefilter(dates){
     this.show=true;
   this.arrears=[]
    let enddate=dates.enddate;
    let startdate=dates.startdate;
   let start= format(new Date(startdate), "yyyy/MM/dd");
   let end= format(new Date(enddate), "yyyy/MM/dd");
   const strtdate = new Date(startdate);
   const eddate = new Date(enddate);
      if(strtdate < eddate){
         console.log(start,end)
         let customerid=localStorage.getItem("memberid")
         let token=localStorage.getItem("token")
         this.subscribeServ.receipthistory(start,end,customerid,token).subscribe(res=>{
            console.log(res)
            this.receiptdata=res["AllReceipts"]
            console.log(this.receiptdata)
            for(let j=0;j<this.receiptdata.length;j++){
              this.arrearamount=0;
              this.arrearamount +=(parseFloat(this.receiptdata[j].Total))
              this.arrears.push(this.arrearamount)
              console.log(this.arrears)
              for(let k=0;k<this.arrears.length;k++){
              this.grandtotal +=this.arrears[k]
              }
             }
            //  for(let j=0;j<this.receiptdata.length;j++){
            //    this.arrearamount1=0;
            //    this.arrearamount1 +=(parseFloat(this.receiptdata[j].nonPrizedArrear))
            //    this.arrearamount1 +=(parseFloat(this.receiptdata[j].prizedArrear))
            //    this.arrears1.push(this.arrearamount1)
            //    console.log(this.arrears1)
            //  }
             if(Array.isArray(this.receiptdata) && this.receiptdata.length){
               this.show1=false;
             }
             else{
               this.presentToast("No Data Found")
               this.show1=true;
             }
         },(error:HttpErrorResponse)=>{
            if(error.status ===401){          
              this.presentToast("Session timeout, please login to continue.");
              this.router.navigate(["/login"]);
           }
           else if(error.status ===400){        
            this.presentToast("Server Error! Please try login again.");
            this.router.navigate(["/login"]);
          }
          else{
            this.presentToast("Server Error! Please try login again.");
            this.router.navigate(["/login"]);
           } })
      }
       else{
         this.presentToast("Start date should be less than end date");
       }
    

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


