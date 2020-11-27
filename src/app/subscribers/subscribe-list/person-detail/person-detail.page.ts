import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
import { Router } from '@angular/router';
import {Platform,LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
personaldetail:any;
ref:any
 constructor(private http:HttpClientModule, public subscribeServ: SubscriberApiService,private router:Router,public platform:Platform,
  public loadingcontroller:LoadingController) { }

  ngOnInit() {
   
  }

ionViewWillEnter(){
  let memidnew=localStorage.getItem('memberid')
  this.platform.ready().then(()=>{
    this.loadingcontroller.create({
      message:"loading..."
    }).then((HTMLIonLoadingElement)=>{
      HTMLIonLoadingElement.present();
      this.ref=this;
  this.subscribeServ.personalDetails(memidnew).subscribe((res)=>{
    this.ref.loadingcontroller.dismiss();
      console.log(res)
      this.personaldetail=res['UserDetails'];
      }) 
    })
  })
}
back(){
  this.router.navigate(["/subscribe-list"])
    }
}
