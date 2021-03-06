import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from'@angular/router';
import { SubscriberApiService } from 'src/app/subscribers/subscriber-api.service';
import {Platform,LoadingController} from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { isEmpty } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { CommonApiService } from 'src/app/Login/common-api.service';
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
  avoid_chits: any[]=[];
  valid_chits: any[]=[];
  profileimage: any;
  imageUrl:any;
  blocked_chits: any=[];
  perfect_chits: any=[];
  Extra_amountchits: any=[];
  v_amountchits: any=[];
  v1_amountchits: any=[];
  constructor(private router:Router,  public subscribeServ: SubscriberApiService,public alertController: AlertController,public platform:Platform,
    public loadingcontroller:LoadingController,public toastController: ToastController,public common:CommonApiService) { 
     
  }
 ngOnInit() {
 
    
}
blockchits(val){
  if(val.IsBlocked==1){
    this.presentToast(" This Chit Number " +val.ChitNo+ ` is blocked , Due to ${val.BlockReason}`);
  }
}
async ionViewWillEnter(){
  
   const loading = await this.loadingcontroller.create({
    message: 'Please Wait',
    translucent: true,
  });
  await loading.present();
  this.userlist3=[];
  this.arrayvalue=[];
  let memidnew=localStorage.getItem('memberid')
  localStorage.setItem('exememberid',memidnew)
  let token=localStorage.getItem("token")
    this.subscribeServ.personalDetails(memidnew,token).subscribe((res)=>{
      console.log(res)
      this.personaldetail=res['UserDetails'];
      this.mem_id=localStorage.getItem('memberid')
      this.sub_id=this.personaldetail[0].BranchId
      localStorage.setItem("subid",this.sub_id)
      this.customername=this.personaldetail[0].CustomerName
      this.customerid=this.personaldetail[0].MemberID
      localStorage.setItem("customername",this.customername)
 
       // localStorage.setItem("memberid",this.customerid)
      console.log(this.mem_id,this.sub_id)
      this.Logo = this.customername.charAt(0);
      localStorage.setItem('iniitial_logo',this.Logo)
      localStorage.setItem("personaldatas",JSON.stringify(this.personaldetail))
      localStorage.setItem("exepersonaldatas",JSON.stringify(this.personaldetail))
      // this.imagecall(this.imageUrl+this.personaldetail[0]["ImgUrl"]);
      loading.dismiss();
     
  }
  ,(error:HttpErrorResponse)=>{
    if(error.status ===401){   
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })         
      loading.dismiss();
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){   
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })    
    loading.dismiss();      
    this.presentToast("Session timeout / Server Error! Please login again");
    this.router.navigate(["/login"]);
 }else{
  loading.dismiss(); 
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
  })       
  this.presentToast("Session timeout / Server Error! Please login again");
  this.router.navigate(["/login"]);
 }
 
 }
  ) 

       
  this.subscribeServ.getprofileimg(memidnew,token).subscribe((res)=>{
    console.log(res)
    this.profileimage=res['ImageUrl']
  },(error:HttpErrorResponse)=>{
    if(error.status ===401){ 
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })           
      loading.dismiss();
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){    
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })   
    loading.dismiss();      
    this.presentToast("Session timeout / Server Error! Please login again");
    this.router.navigate(["/login"]);
 }else{
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
  })  
  loading.dismiss();      
  this.presentToast("Session timeout / Server Error! Please login again");
  this.router.navigate(["/login"]);
 }
 
 })

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
      this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
      })       
      loading.dismiss();    
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){ 
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })      
    loading.dismiss();   
    this.presentToast("Session timeout / Server Error! Please login again");
    this.router.navigate(["/login"]);
  } 
  else{
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })  
    loading.dismiss();      
    this.presentToast("Session timeout / Server Error! Please login again");
    this.router.navigate(["/login"]);
   }}) ;

  
  let count="CPAPP"
  this.subscribeServ.voucherCount(count,token).subscribe((res)=>{
  let voucher=res
  console.log(res)
  localStorage.setItem("voucher",JSON.stringify(voucher))
 }
 ,(error:HttpErrorResponse)=>{
  if(error.status ===401){    
    this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    })        
    this.presentToast("Session timeout, please login to continue.");
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){ 
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
  })         
  this.presentToast("Session timeout / Server Error! Please login again");
  this.router.navigate(["/login"]);
}
else{
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
  })  
  loading.dismiss();      
  this.presentToast("Session timeout / Server Error! Please login again");
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
  this.avoid_chits=[];
  this.valid_chits=[];
  this.blocked_chits=[];
  this.perfect_chits=[];
  this.Extra_amountchits=[];
  this.v_amountchits=[];
  this.arrayprized=[];
  this.v1_amountchits=[];
  console.log(this.arrayvalue)
    if(this.arrayvalue.length !=0){
      for(var i=0; i<this.arrayvalue.length;i++){
        if(this.arrayvalue[i].PrizedArrier=='0.00' && this.arrayvalue[i].NonPrizedArrier=='0.00' && this.arrayvalue[i].Interest=='0' && this.arrayvalue[i].CurrentDueAmount=='0.00')  this.Extra_amountchits.push(this.arrayvalue[i])
       }
       console.log(this.Extra_amountchits,"Extra amount chits")
      for(var i=0; i<this.userlist3.length;i++){
       if(this.userlist3[i].IsPrized=='Y')  this.prized_chits.push(this.userlist3[i])
       if(this.userlist3[i].IsBlocked =="1")  this.blocked_chits.push(this.userlist3[i])
      }
      for(var i=0; i<this.prized_chits.length;i++){
        if(this.prized_chits[i].PrizedArrier=="0.00" && this.prized_chits[i].NonPrizedArrier=="0.00" )  this.avoid_chits.push(this.prized_chits[i])
        if(this.prized_chits[i].PrizedArrier !=="0.00" || this.prized_chits[i].NonPrizedArrier!=="0.00" )  this.valid_chits.push(this.prized_chits[i])
       }
     console.log(this.blocked_chits,"avoid")
     console.log(this.avoid_chits,"avoid")
   console.log(this.valid_chits,"valid")
      if(this.prized_chits.length!=0 && this.blocked_chits.length==0 && this.Extra_amountchits.length==0){
        if(this.arrayvalue.length <=1){ 
          console.log(this.arrayvalue[0])     
           if(this.arrayvalue[0].IsPrized=='Y'){
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
             queryParams: { state:data },
             
           };
         this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
           }
           else if(this.arrayvalue[0].IsPrized=='N' && this.valid_chits.length==0 && this.avoid_chits.length !=0){
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
             queryParams: { state:data },
             
           };
         this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
           }
         else return this.presentToast("Must choose atleast 1 Prized Chit");
        }else if(this.arrayvalue.length ==2){
          for(let i=0;i<this.arrayvalue.length;i++){
          if(this.arrayvalue[i].IsPrized=="Y"){
            this.arrayprized.push(this.arrayvalue[i])            
          }
        }
        if(this.arrayprized.length==0 && this.valid_chits.length>=1) return this.presentToast("Choose atleast 1 prized chits");
        else{
         console.log("prized")
         let data = JSON.stringify(this.arrayvalue)
         let navigationExtras: NavigationExtras = {
          queryParams: { state:data },
          
        };
        this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
        }
        }
        else if(this.arrayvalue.length >2){
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
            if(this.arrayvalue.length ==3){
              if(this.arrayprized.length ==0 ){
                return this.presentToast("Choose atleast 1 prized chits");
              }else{
                console.log("prized")
                let data = JSON.stringify(this.arrayvalue)
                let navigationExtras: NavigationExtras = {
                 queryParams: { state:data },
                 
               };
             this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
              }

           }
           if(this.arrayvalue.length ==4 ){
            if(this.arrayprized.length ==0 ){
              return this.presentToast("Choose atleast 2 prized chits");
            } else if(this.arrayprized.length >= 2){
              console.log("prized")
              let data = JSON.stringify(this.arrayvalue)
              let navigationExtras: NavigationExtras = {
               queryParams: { state:data },
               
             };
           this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
            }
            else{
              console.log("prized")
              let data = JSON.stringify(this.arrayvalue)
              let navigationExtras: NavigationExtras = {
               queryParams: { state:data },
               
             };
           this.router.navigate(["/subscribe-list/subscriber-payment"],navigationExtras)
            }

         }
           else if( this.arrayvalue.length > 4 && this.valid_chits.length >=1){
             if(this.arrayprized.length < 2){
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
      }}
      else if(this.blocked_chits?.length !=0){
        this.presentToast("Chit Number is blocked. Please contact admin");
      }
    else if(this.Extra_amountchits?.length !=0){
      for(var i=0; i<this.arrayvalue.length;i++){
        if(this.arrayvalue[i].PrizedArrier !='0.00' || this.arrayvalue[i].NonPrizedArrier !='0.00' || this.arrayvalue[i].Interest !='0' || this.arrayvalue[i].CurrentDueAmount !='0.00')  this.v_amountchits.push(this.arrayvalue[i])
       }
      for(var i=0; i<this.userlist3.length;i++){
     if(this.userlist3[i].PrizedArrier !='0.00' || this.userlist3[i].NonPrizedArrier !='0.00' || this.userlist3[i].Interest !='0' || this.userlist3[i].CurrentDueAmount !='0.00')  this.v1_amountchits.push(this.userlist3[i])
       }

       if(this.v_amountchits.length !=0){
        this.presentToast("Excess amount chit cannot be paid with Normal chit");
       }
       else if(this.v1_amountchits.length !=0){
        this.presentToast("You're having arrear amount chit so excess amount chit cannot be paid");
       }
       else{
        let data = JSON.stringify(this.arrayvalue)
        let navigationExtras: NavigationExtras = {
         queryParams: { state:data },
         
       };
       localStorage.setItem("excesspage","subscribelist")
     this.router.navigate(["/subscribe-list/payeccess-amount"],navigationExtras)
       }
    }
      else{
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
    message: 'Are you sure want to logout?',
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
          this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
            })
          this.router.navigate(['/selectapp'])
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

    allchits(){
      this.router.navigate(['/subscribe-list/all-chits'])
    }
    indianRupeeFormat(val: number) {
      return Number(val).toLocaleString('en-IN');
    }
}


