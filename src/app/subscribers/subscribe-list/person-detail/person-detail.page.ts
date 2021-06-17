import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
import { Router } from '@angular/router';
import {Platform,LoadingController, ToastController} from '@ionic/angular';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
personaldetail:any=[];
ref:any
 constructor(private http:HttpClientModule, public subscribeServ: SubscriberApiService,private router:Router,public platform:Platform,
  public loadingcontroller:LoadingController,public toastController: ToastController) { }

  ngOnInit() {
   
  }

 async ionViewWillEnter(){
  const loading = await this.loadingcontroller.create({
    message: 'Please Wait',
    translucent: true,
  });
  await loading.present();
  this.platform.backButton.subscribeWithPriority(1, () => {
    this.router.navigateByUrl('/subscribe-list')
       });
let memidnew=localStorage.getItem('memberid')
let token=localStorage.getItem("token")
  this.subscribeServ.personalDetails(memidnew,token).subscribe((res)=>{

      console.log(res)
      this.personaldetail=res['UserDetails'];
      loading.dismiss();
      },(error:HttpErrorResponse)=>{
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

    reset(){
      localStorage.setItem("customer",this.personaldetail[0].username);
      this.router.navigate(['/reset-password'])
    }
}
