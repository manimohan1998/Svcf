import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { CommonApiService } from 'src/app/Login/common-api.service';
import { SubscriberApiService } from '../../subscriber-api.service';
@Component({
  selector: 'app-show-chits',
  templateUrl: './show-chits.page.html',
  styleUrls: ['./show-chits.page.scss'],
})
export class ShowChitsPage implements OnInit {
  chitdetails: any=[];
  term="";
  details:any=[]
  chitid: any;
  customername: string;
  constructor(private router:Router,public platform:Platform,public route: ActivatedRoute, public subscribeServ: SubscriberApiService,private common:CommonApiService,
    public toastController: ToastController) { 
    this.route.queryParams.subscribe(params => {
      this.chitdetails = JSON.parse(params.state);
      console.log(this.chitdetails.Head_Id)
      this.chitid=this.chitdetails.GrpMemberID
      let token=localStorage.getItem("token")
        this.subscribeServ.allchitsdetails(this.chitdetails.Head_Id,token).subscribe((res)=>{
        console.log(res)
        this.details=res['chits']
        },(error:HttpErrorResponse)=>{
          if(error.status ===401){ 
            this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
            })           
            this.presentToast("Session timeout, please login to continue.");
            this.router.navigate(["/login"]);
         }
         else if(error.status ===400){   
          this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
          })      
          this.presentToast("Server Error! Please try login again.");
          this.router.navigate(["/login"]);
       }
       else{
        this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
        })  
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
       }})
     })
   
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
  ionViewWillEnter(){
    this.customername=localStorage.getItem("customername")
  }
  getHeaders() {
    let headers: string[] = [];
    if(this.details) {
      this.details.forEach((value) => {
        Object.keys(value).forEach((key) => {
          if(!headers.find((header) => header == key)){
            headers.push(key)
          }
        })
      })
    }
    return headers;
  }
  indianRupeeFormat(val: number) {
    return Number(val).toLocaleString('en-IN');
  }
}
