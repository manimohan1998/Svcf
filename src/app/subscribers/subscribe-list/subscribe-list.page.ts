import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from'@angular/router';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';

@Component({
  selector: 'app-subscribe-list',
  templateUrl: './subscribe-list.page.html',
  styleUrls: ['./subscribe-list.page.scss'],
})
export class SubscribeListPage implements OnInit {
  data: any;
  userlist:any;
  noOfChits:number;
  prizeddata:any=[];
  nonprizeddata:any=[];
  newdata:string[] = Array(); 
  myObj:any;
  arrayvalue:any=[];
  constructor(private router:Router,  public subscribeServ: SubscriberApiService) { 
    this.myObj = {
    "cars": [
      { "currentinstno":"1","arrearamount":"00.00","currentdue":"10000","interestamount":"00.00","totalpaid":"20000","status":"prized" },
      { "currentinstno":"2","arrearamount":"00.00","currentdue":"10000","interestamount":"00.00","totalpaid":"20000","status":"non-prized" },
      { "currentinstno":"3","arrearamount":"00.00","currentdue":"10000","interestamount":"00.00","totalpaid":"20000","status":"non-prized" },
      { "currentinstno":"4","arrearamount":"00.00","currentdue":"10000","interestamount":"00.00","totalpaid":"20000","status":"prized" },
      { "currentinstno":"5","arrearamount":"00.00","currentdue":"10000","interestamount":"00.00","totalpaid":"20000","status":"non-prized" },
      
    ]
     }

  }


 
ngOnInit() {
    console.log(this.myObj.cars)
    this.userlist=this.myObj.cars;
    this.noOfChits=this.myObj.cars.length;


for(var i=0;i<this.noOfChits;i++){
  if(this.myObj.cars[i].status=="prized"){
   this.prizeddata.push(this.myObj.cars[i]);
  
  }
  if(this.myObj.cars[i].status=="non-prized"){
    this.nonprizeddata.push(this.myObj.cars[i]);
   }
}
console.log(this.prizeddata)
console.log(this.nonprizeddata)




    // this.subscribeServ.subscriberList(sub_id).subscribe(res=>{
    //   console.log(res)
    // })
 
}

processdata(){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      payment: JSON.stringify(this.arrayvalue)
    }
  };
  this.router.navigate(["subscribe-list/subscriber-payment"], navigationExtras)
}

passParams(event,val:any){
if(event.detail.checked){
  this.arrayvalue.push(val);
  }
if (!event.detail.checked) {
  let index = this.arrayvalue.indexOf(val);
if (index > -1) {
  this.arrayvalue.splice(index, 1);
  }
}
}


}
