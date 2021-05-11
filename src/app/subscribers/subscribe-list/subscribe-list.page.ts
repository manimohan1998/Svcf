import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from'@angular/router';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
import {Platform,LoadingController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { isEmpty } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
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
  mem_id:any=[]
  sub_id:any=[]
  customername:any
  userlist3: any=[];
  chit_length:number=0;
  ref:any
  output: boolean;
  Arrearval: number;
  Arrearval1: number;
  arrayprized: any[]=[];
  prized_chits:any[]=[];
  Logo: any;
  customerid: any;
  term="";
  alerts: any=[];
  count: number=0;
  constructor(private router:Router,  public subscribeServ: SubscriberApiService,public alertController: AlertController,public platform:Platform,
    public loadingcontroller:LoadingController,public toastController: ToastController) { 
     
  }
 ngOnInit() {
 
    
}
async ionViewWillEnter(){
  this.userlist3=[];
  this.arrayvalue=[];
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
      this.mem_id=localStorage.getItem('memberid')
      this.sub_id=this.personaldetail[0].BranchId
      localStorage.setItem("subid",this.sub_id)
      this.customername=this.personaldetail[0].CustomerName
      this.customerid=this.personaldetail[0].MemberID
      // localStorage.setItem("memberid",this.customerid)
      console.log(this.mem_id,this.sub_id)
      this.Logo = this.customername.charAt(0);
      localStorage.setItem('iniitial_logo',this.Logo)
      localStorage.setItem("personaldatas",JSON.stringify(this.personaldetail))
      loading.dismiss();
  }
  ,(error:HttpErrorResponse)=>{
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
 }
  ) 

      

  // this.platform.ready().then(()=>{
  //   this.loadingcontroller.create({
  //     message:"loading..."
  //   }).then((HTMLIonLoadingElement)=>{
  //     HTMLIonLoadingElement.present();
  //     this.ref=this;
  //       this.subscribeServ.subscriberList( this.mem_id,this.sub_id).subscribe(res=>{
  //       this.ref.loadingcontroller.dismiss();
  //       this.userlist1=(res['chits']) 
  //       if (Array.isArray(this.userlist1) && this.userlist1.length){ 
  //              this.output = true; 
  //       }
  //           else {this.output = false; this.ionViewWillEnter()}
  //        if(this.output===true){       
  //       for(let i=0;i<this.userlist1.length;i++){
  //   if(this.userlist1[i].status=="R" || (this.userlist1[i].status=="T" && (this.userlist1[i].NonPrizedArrier!='0.00' || this.userlist1[i].PrizedArrier!='0.00'))){
  //       this.userlist3.push(this.userlist1[i]);
  //       this.chit_length=this.userlist3.length
  //       }}
  //    if(this.chit_length===0){
  //         this.presentToast("You Have No Runnning Chits");
  //       }  
  //     }
  //     },error=>{
  //       alert(console.log(error));
  //     }) ;
    
  //   })  
  // })
  this.count=0
  this.platform.backButton.subscribeWithPriority(1, () => {
    this.count +=1;
    console.log(this.count)
    if(this.count==2){
      this.backButtonAlert();
      this.count-=1;
    }
  });

}
async backButtonAlert(){
    
  const alert =await this.alertController.create({
    message:'Do you want to exit app',
    buttons: [{
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
       }
    },{
      text: 'Close app',
      handler: () =>{
        localStorage.clear();
        navigator['app'].exitApp();
      }
    }]
  })

  await alert.present();
}
async ionViewDidEnter(){
  const loading = await this.loadingcontroller.create({
    message: 'Please Wait',
    translucent: true,
  });
  await loading.present();
  let memid=localStorage.getItem('memberid')
  let sub_id=localStorage.getItem('subid')
  let token=localStorage.getItem("token")
  this.subscribeServ.subscriberList(memid,sub_id,token).subscribe(res=>{
       
    this.userlist1=(res['chits']) 

    if (Array.isArray(this.userlist1) && this.userlist1.length){ 
     
   for(let i=0;i<this.userlist1.length;i++){
    loading.dismiss();
if(this.userlist1[i].status=="R" || (this.userlist1[i].status=="T" && (this.userlist1[i].NonPrizedArrier!='0.00' || this.userlist1[i].PrizedArrier!='0.00'))){
    this.userlist3.push(this.userlist1[i]);
    this.chit_length=this.userlist3.length
 
    }}}

  
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
  } }) ;

  
  let count="CPAPP"
  this.subscribeServ.voucherCount(count,token).subscribe((res)=>{
  let voucher=res
  console.log(res)
  localStorage.setItem("voucher",JSON.stringify(voucher))
 }
 ,(error:HttpErrorResponse)=>{
  if(error.status ===401){          
    this.presentToast("Session timeout, please login to continue.");
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){        
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

processdata(){
  this.prized_chits=[];
    if(this.arrayvalue.length !=0){
      for(var i=0; i<this.userlist3.length;i++){
       if(this.userlist3[i].IsPrized=='Y')  this.prized_chits.push(this.userlist3[i])
      }
      if(this.prized_chits.length!=0){
        if(this.arrayvalue.length <=1){ 
          console.log(this.arrayvalue[0])     
           if(this.arrayvalue[0].IsPrized=='Y'){
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
             queryParams: { state:data },
             
           };
         this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
           }else return this.presentToast("Must choose atleast 1 Prized Chit");
        }else if(this.arrayvalue.length ==2){
          for(let i=0;i<this.arrayvalue.length;i++){
          if(this.arrayvalue[i].IsPrized=="Y"){
            this.arrayprized.push(this.arrayvalue[i])            
          }
        }
        if(this.arrayprized.length==0) return this.presentToast("Choose atleast 1 prized chits");
        else{
         console.log("prized")
         let data = JSON.stringify(this.arrayvalue)
         let navigationExtras: NavigationExtras = {
          queryParams: { state:data },
          
        };
        this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
        }
        }else if(this.arrayvalue.length >2){
          console.log(this.prized_chits)
          if(this.prized_chits.length==1){
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
             queryParams: { state:data },
             
           };
         this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
          }else if(this.prized_chits.length>=2){
            console.log(this.prized_chits)
            for(let i=0;i<this.arrayvalue.length;i++){
             if(this.arrayvalue[i].IsPrized=="Y"){
               this.arrayprized.push(this.arrayvalue[i])
               
             }
           }
           if(this.arrayprized.length <2){
                 console.log("nonprized")
                 return this.presentToast("Choose atleast 2 prized chits");
               }else{           
                console.log("prized")
                let data = JSON.stringify(this.arrayvalue)
                let navigationExtras: NavigationExtras = {
                 queryParams: { state:data },
                 
               };
             this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
               }
          }
        }
      }else{
            let data = JSON.stringify(this.arrayvalue)
              let navigationExtras: NavigationExtras = {
                queryParams: { state:data },
                
              };
            this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
      }  
    }else return this.presentToast("Please choose atleast one chit");
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

profile(){
  this.router.navigate(['/subscribe-list/person-detail'])
}
async logout(){
  const alert_info = await this.alertController.create({
    header: 'App termination',
    message: 'Do you want to close the app?',
    buttons:[
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          // this.ionViewWillEnter();
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
          this.presentToast("Logout Successfully");
          }
      }
      
    ]
})
await alert_info.present();
    }
    ngOnDestroy(){
      this.userlist3=[];
      this.userlist1=[];
      this.arrayvalue=[];
    }

    
}


