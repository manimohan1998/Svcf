import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from'@angular/router';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
import {Platform,LoadingController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { isEmpty } from 'rxjs/operators';
@Component({
  selector: 'app-subscribe-list',
  templateUrl: './subscribe-list.page.html',
  styleUrls: ['./subscribe-list.page.scss'],
})
export class SubscribeListPage implements OnInit {
  data: any;
  userlist:any;
  userlist1:any=[];
  noOfChits:number;
  arrayvalue:any=[];
  checkbox:string = 'prized';
  chitss: any;
  personaldetail1: any;
  personaldetail: any;
  mem_id:any
  sub_id:any
  customername:any
  userlist3: any=[];
  chit_length:any
  ref:any
  output: boolean;
  constructor(private router:Router,  public subscribeServ: SubscriberApiService,public alertController: AlertController,public platform:Platform,
    public loadingcontroller:LoadingController) { 
     
  }
ngOnInit() {
  this.arrayvalue.splice(0,this.arrayvalue.length)
    this.subscribeServ.personalDetails().subscribe((res)=>{
      console.log(res)
      this.personaldetail=res['UserDetails'];
      this.mem_id=localStorage.getItem('memberid')
      this.sub_id=this.personaldetail[0].BranchId
      this.customername=this.personaldetail[0].CustomerName
      console.log(this.mem_id,this.sub_id)
      
  }) 
    
}
ionViewWillEnter(){
  this.userlist3.splice(0,this.userlist3.length)
  this.arrayvalue.splice(0,this.arrayvalue.length)
  this.platform.ready().then(()=>{
    this.loadingcontroller.create({
      message:"loading..."
    }).then((HTMLIonLoadingElement)=>{
      HTMLIonLoadingElement.present();
      this.ref=this;
        this.subscribeServ.subscriberList( this.mem_id,this.sub_id).subscribe(res=>{
        this.ref.loadingcontroller.dismiss()
        this.userlist1=(res['chits']) 
        if (Array.isArray(this.userlist1) && this.userlist1.length){ 
               this.output = true; 
        }
            else {this.output = false; }
         if(this.output===true){       
        for(let i=0;i<this.userlist1.length;i++){
        if(this.userlist1[i].status==="R"){
        this.userlist3.push(this.userlist1[i]);
        this.chit_length=this.userlist3.length
        }  
        }}
      },error=>{
        alert(console.log(error));
      }) ;
    })  
  })
  

 
}

// status(val,status){
// if(status=="T"){
//   //  this.userlist[val].status="prized"
// }
// if(status=="R"){
//   //  this.userlist[val].status="Non-prized"
// }
// }
processdata(){
  if(this.arrayvalue.length !=0){
  let navigationExtras: NavigationExtras = {
  queryParams: {
  payment: JSON.stringify(this.arrayvalue)
  }
  };
  this.router.navigate(["subscribe-list/subscriber-payment"], navigationExtras)
}
else{
  alert("please select chits")
}
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


async logout(){
  const alert_info = await this.alertController.create({
    header: 'logout',
    message: ``,
    buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('ok clicked');
          // localStorage.removeItem('token');
          // localStorage.removeItem('memberid');
          this.router.navigate(['/login'])
          localStorage.clear()
        }
      }
      
    ]
})

await alert_info.present();
    }
    ngOnDestroy(){
      this.userlist3.splice(0,this.userlist3.length)
      this.userlist1.splice(0,this.userlist1.length)
      this.arrayvalue.splice(0,this.arrayvalue.length)
    }
    
}


