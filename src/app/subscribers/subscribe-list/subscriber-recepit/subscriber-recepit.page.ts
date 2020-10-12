import { Component, OnInit } from '@angular/core';
import { SubscriberApiService } from '../../subscriber-api.service';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-subscriber-recepit',
  templateUrl: './subscriber-recepit.page.html',
  styleUrls: ['./subscriber-recepit.page.scss'],
})
export class SubscriberRecepitPage implements OnInit {
  
  data=['https://www.lifewire.com/thmb/1na-tdifkQUT1obPOp7r0AwP2Bc=/1373x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ScreenShot2020-04-20at10.06.28AM-69855f4797cb4be4bbed72f51dff1ab5.jpg',
'https://www.lifewire.com/thmb/1na-tdifkQUT1obPOp7r0AwP2Bc=/1373x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ScreenShot2020-04-20at10.06.28AM-69855f4797cb4be4bbed72f51dff1ab5.jpg']
  imgs: any;
 
  public sendTo   : any; 
  public subject  : string = 'Message from Social Sharing App';
  public message  : string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
  // public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string	= 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';
  image: any;




  constructor(public subscribeServ: SubscriberApiService,private socialshare:SocialSharing,private platform:Platform) { }
 
  ngOnInit() {
    
    // this.subscribeServ.ReceiveRecipt(id).subscribe(res=>{
    //    console.log(res)
    // })
  }
  shareViaEmail(img)
   {
     this.image=img;
      this.platform.ready()
      .then(() => 
      {
         this.socialshare.canShareViaEmail()
         .then(() => 
         {
            this.socialshare.shareViaEmail(this.image, this.subject, this.sendTo)
            .then((data) =>
            {
               console.log('Shared via Email');
            })
            .catch((err) =>
            {
               console.log('Not able to be shared via Email');
            });
         })
         .catch((err) =>
         {
            console.log('Sharing via Email NOT enabled');
         });
      });
   }
  }


