import { Component, OnInit } from '@angular/core';
import { SubscriberApiService } from '../../subscriber-api.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {format} from "date-fns";
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




  constructor(public subscribeServ: SubscriberApiService,private socialshare:SocialSharing,
    private router:Router,public route: ActivatedRoute,private fb:FormBuilder) { 
   
    this.dateform = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      });
  }
 
  ngOnInit() {
 
  
  }
  ionViewWillEnter(){
  
  }
  back(){
this.router.navigate(["/subscribe-list"])
  }
  datefilter(dates){
    let enddate=dates.enddate;
    let startdate=dates.enddate;
   let start= format(new Date(enddate), "yyyy/MM/dd");
   let end= format(new Date(startdate), "yyyy/MM/dd");
console.log(start,end)
let customerid=localStorage.getItem("memberid")
this.subscribeServ.receipthistory(start,end,customerid).subscribe(res=>{
   console.log(res)
})
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


