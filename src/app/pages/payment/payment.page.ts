import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { environment } from '../../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
selector: 'app-payment',
templateUrl: './payment.page.html',
styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
today = Date.now();
user_details:any;
payee_details:any
mem_id:any;
send:any;
grpmember_id:any;
name:any;
arrayvalue: any[]=[];
status:any;
pushvalue:any=[];
length1:any;
newarr:any;
arrear:any;
prized:any;
green:boolean=false;
red:boolean=false;
checkbox:boolean=false;
new_check:boolean=false;
prized_array:any=[];
nonprized_array:any=[];
arrayprized: any[]=[];
prized_chits: any[]=[];
imageUrl:any;
profile:any;
  avoid_chits: any[]=[];
  valid_chits: any[]=[];
  blocked: any[]=[];
constructor(private route: ActivatedRoute,public alertController: AlertController, private router: Router,public paymentservice:PaymentService,
  public toastController: ToastController) {

}
ionViewWillEnter() {
this.imageUrl = environment.Imageurl;
this.arrayvalue=[];
this.newarr=[];
this.pushvalue=[];
this.user_details=JSON.parse(localStorage.getItem("user2"));
let token=localStorage.getItem("tokens");
this.paymentservice.payment_details(this.user_details.MemberID,token).subscribe(res =>{
this.payee_details=res;
console.log(this.payee_details)
for (let i=0;i<this.payee_details.length;i++){
  this.status=this.payee_details[i].status;
  this.arrear=this.payee_details[i].arrearamount;
  this.prized=this.payee_details[i].isprized;
  if(this.status == 'R'||this.arrear > 0 ){
  this.pushvalue.push(this.payee_details[i]);
  var dups = [];
  this.newarr = this.pushvalue.filter(function(el) {
  if (dups.indexOf(el.groupno) == -1) {
  dups.push(el.groupno);
  return true;
  }
  return false;
  });
  this.length1=this.pushvalue.length;
  this.profile=this.newarr[0].ImgUrl;
  }
  if(this.payee_details[i].isprized == 'N'){
  this.payee_details[i].isprized='Non-Prized';
  }
  else {
  this.payee_details[i].isprized='Prized';
  }
  }
  }
  ,(error:HttpErrorResponse)=>{
    if(error.status ===401){          
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){           
    this.presentToast("Server Error! Please try login again.");
    this.router.navigate(["/login"]);
 }
 
  }
  
  
  
  )
  }
  ngOnInit() {
  }
  updateCheckedOptions(chBox, event) {
  if(event.detail.checked){
  this.arrayvalue.push(chBox);
  }
  if (!event.detail.checked) {
  let index = this.arrayvalue.indexOf(chBox);
  if (index > -1) {
  this.arrayvalue.splice(index, 1);
  }
  
  }
  }
  previous(){
  this.router.navigateByUrl('dashboard')
  }
  
  cash(){
  this.prized_chits=[];
  this.valid_chits=[];
  this.avoid_chits=[];
  this.blocked=[];
  if(this.arrayvalue.length !=0){
  for(var i=0; i<this.newarr.length;i++){
    if(this.newarr[i].isprized=='Prized')  this.prized_chits.push(this.newarr[i])
    }
    if(this.newarr[i]?.IsBlocked == 1){
      this.blocked.push(this.newarr[i])
    }
    for(var i=0; i<this.prized_chits.length;i++){
      if(this.prized_chits[i].PrizedArrear=="0.00" && this.prized_chits[i].NonPrizedArrear=="0.00" )  this.avoid_chits.push(this.prized_chits[i])
      if(this.prized_chits[i].PrizedArrear !=="0.00" || this.prized_chits[i].NonPrizedArrear!=="0.00")  this.valid_chits.push(this.prized_chits[i])
   }
   console.log(this.avoid_chits,"avoid")
   console.log(this.valid_chits,"valid")
    if(this.prized_chits.length!=0 && this.blocked.length==0){
    
    if(this.arrayvalue.length <=1){
    
    if(this.arrayvalue[0].isprized=='Prized'){
    let data = JSON.stringify(this.arrayvalue)
    let navigationExtras: NavigationExtras = {
    queryParams: { state:data },
    skipLocationChange: true
    };
    this.router.navigate(['payment/cash'],navigationExtras)
    }
    else if(this.arrayvalue[0].isprized=='Non-Prized' && this.valid_chits.length==0 && this.avoid_chits.length !=0){
      let data = JSON.stringify(this.arrayvalue)
    let navigationExtras: NavigationExtras = {
    queryParams: { state:data },
    skipLocationChange: true
    };
    this.router.navigate(['payment/cash'],navigationExtras)
    }
    else return this.presentToast("Must choose atleast 1 Prized Chit");
    }else if(this.arrayvalue.length ==2){
    for(let i=0;i<this.arrayvalue.length;i++){
      if(this.arrayvalue[i].isprized=="Prized"){
      this.arrayprized.push(this.arrayvalue[i])
      }
      }
      if(this.arrayprized.length==0 && this.valid_chits.length>=1) return this.presentToast("Choose atleast 1 prized chits")
      else{
      let data = JSON.stringify(this.arrayvalue)
      let navigationExtras: NavigationExtras = {
      queryParams: { state:data },
      skipLocationChange: true
      };
      this.router.navigate(['payment/cash'],navigationExtras)
      }
      }else if(this.arrayvalue.length >2){
      if(this.prized_chits.length==1){
      let data = JSON.stringify(this.arrayvalue)
      let navigationExtras: NavigationExtras = {
      queryParams: { state:data },
      skipLocationChange: true
      };
      this.router.navigate(['payment/cash'],navigationExtras)
      }else if(this.prized_chits.length>=2){
      for(let i=0;i<this.arrayvalue.length;i++){
        if(this.arrayvalue[i].isprized=="Prized"){
        this.arrayprized.push(this.arrayvalue[i])
        }
        }
        if(this.arrayprized.length <2 && this.valid_chits.length >=2){
        return this.presentToast("Choose atleast 2 prized chits")
        }
        else{
        let data = JSON.stringify(this.arrayvalue)
        let navigationExtras: NavigationExtras = {
        queryParams: { state:data },
        skipLocationChange: true
        };
        this.router.navigate(['payment/cash'],navigationExtras)
        }
        }
        }
        }
        else if(this.blocked.length!=0){
this.presentToast("This Chit Number is blocked,Contact admin")
        }
          else{
        let data = JSON.stringify(this.arrayvalue)
        let navigationExtras: NavigationExtras = {
        queryParams: { state:data },
        skipLocationChange: true
        };
        this.router.navigate(['payment/cash'],navigationExtras)
        }
        }else return this.presentToast("Please choose atleast one chit")
        }
        logout(){
        this.presentAlertConfirm();
        }
        
        
        
        
        async presentAlertConfirm() {
        const alert = await this.alertController.create({
        message: 'Are you sure you want to logout?',
        buttons: [
        {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
        }, {
        text: 'Logout',
        handler: () => {
        localStorage.clear();
        this.router.navigate(['login']);
        }
        }
        ]
        });
        await alert.present();
        }

        async presentToast(message) {
          const toast = await this.toastController.create({
              message: message,
              duration: 2000
           });
            toast.present();
        }
        
        
        }