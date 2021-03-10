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
personaldetail:any=[];
ref:any
 constructor(private http:HttpClientModule, public subscribeServ: SubscriberApiService,private router:Router,public platform:Platform,
  public loadingcontroller:LoadingController) { }

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
  this.subscribeServ.personalDetails(memidnew).subscribe((res)=>{

      console.log(res)
      this.personaldetail=res['UserDetails'];
      loading.dismiss();
      })

}
back(){
  this.router.navigate(["/subscribe-list"])
    }

    reset(){
      localStorage.setItem("customer",this.personaldetail[0].CustomerName);
      this.router.navigate(['/reset-password'])
    }
}
