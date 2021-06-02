import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { SubscriberApiService } from '../../subscriber-api.service';

@Component({
  selector: 'app-all-chits',
  templateUrl: './all-chits.page.html',
  styleUrls: ['./all-chits.page.scss'],
})
export class AllChitsPage implements OnInit {
  term="";
  details:any=[]
  constructor(private router:Router,public platform:Platform, public subscribeServ: SubscriberApiService,
    public toastController: ToastController) { }

  ngOnInit() {
   
  }
  ionViewWillEnter(){
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigateByUrl('/subscribe-list')
         });

    let memidnew=localStorage.getItem('memberid')
    let token=localStorage.getItem("token")
      this.subscribeServ.allchits(memidnew,token).subscribe((res)=>{
      console.log(res)
      this.details=res['ChitList']
      },(error:HttpErrorResponse)=>{
        if(error.status ===401){          
          this.presentToast("Session timeout, please login to continue.");
          this.router.navigate(["/login"]);
       }
       else if(error.status ===400){       
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
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
  back(){
    this.router.navigate(["/subscribe-list"])
      }
      goto(v){
        let data = JSON.stringify(v)
         let navigationExtras: NavigationExtras = {
          queryParams: { state:data },
          
        };
        this.router.navigate(["/subscribe-list/show-chits"],navigationExtras)
      }
}
