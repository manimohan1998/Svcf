import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.page.html',
  styleUrls: ['./person-detail.page.scss'],
})
export class PersonDetailPage implements OnInit {
personaldetail:any;
 constructor(private http:HttpClientModule, public subscribeServ: SubscriberApiService) { }

  ngOnInit() {
   
  }
ionViewWillEnter(){
  this.subscribeServ.personalDetails().subscribe((res)=>{
      console.log(res)
      this.personaldetail=res['UserDetails'];
      
  }) 
}
}
