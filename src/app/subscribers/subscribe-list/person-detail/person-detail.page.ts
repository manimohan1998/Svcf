import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
import { Router } from '@angular/router';
import {Platform,LoadingController, ToastController} from '@ionic/angular';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
personaldetail:any=[];
ref:any
  imageUrl: any;
  profileimage: any;
  personage: number=0;
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
let memidnew=localStorage.getItem('memberid')
let token=localStorage.getItem("token")
  this.subscribeServ.personalDetails(memidnew,token).subscribe((res)=>{

      console.log(res)
      this.personaldetail=res['UserDetails'];
      this.ageFromDateOfBirthday1(this.personaldetail[0].DOB)
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
      } 
      else{
        loading.dismiss();   
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
       }})
      this.subscribeServ.getprofileimg(memidnew,token).subscribe((res)=>{
        console.log(res)
        this.profileimage=res['ImageUrl']
      })
}

public ageFromDateOfBirthday1(dateOfBirth: any): number {
 
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
      return age;
    }
    this.personage =age
    console.log(this.personage)
  
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
      let data={name:this.personaldetail[0].username,password:this.personaldetail[0].password,dob:this.personaldetail[0].DOB}
      localStorage.setItem("firstdata",JSON.stringify(data));
      localStorage.setItem("whichpage","profile")
      this.router.navigate(['/reset'])
      // localStorage.setItem("customer",this.personaldetail[0].username);
      // this.router.navigate(['/reset-password'])
    }
}
