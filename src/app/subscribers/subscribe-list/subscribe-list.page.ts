import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-subscribe-list',
  templateUrl: './subscribe-list.page.html',
  styleUrls: ['./subscribe-list.page.scss'],
})
export class SubscribeListPage implements OnInit {
  data: any;
  userlist:any;
 noOfChits:number;
 prizeddata:string[] = new Array(); 
newdata:string[] = new Array(); 
checkbox: boolean;
 

  constructor() { 
   
   var myObj = {

    "cars": [
      { "currentinstno":"1","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"prized" },
      { "currentinstno":"2","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"non-prized" },
      { "currentinstno":"3","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"non-prized" },
      { "currentinstno":"4","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"prized" },
      { "currentinstno":"5","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"prized" },
      { "currentinstno":"6","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"non-prized" },
      { "currentinstno":"7","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"prized" },
      { "currentinstno":"8","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"non-prized" },
      { "currentinstno":"9","arrearamount":"00.00","currentdue":"10000","totalpaid":"20000","status":"prized" },
    ]
     }
     this.data=myObj;
}
 


  ngOnInit() {
    console.log(this.data.cars)
this.userlist=this.data.cars;
this.noOfChits=this.data.cars.length;

 
}

processdata(){
console.log(this.newdata)

}
 
}
