import {AfterViewInit, Component,OnInit, Inject,ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute,Router,NavigationExtras } from '@angular/router';
import { NavController,ModalController,AlertController, Platform } from '@ionic/angular';
import { PaymentService } from '../../services/payment.service';
import { LoadingController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
selector: 'app-cashprint',
templateUrl: './cashprint.page.html',
styleUrls: ['./cashprint.page.scss'],
})
export class CashprintPage implements OnInit {
content:any;
cash_print_preview:any;
devices:any;
api_id:any=[];
print_cash_page:any;
isLoading = false;
cashprint:FormGroup
constructor(private platform:Platform,public loadingController: LoadingController, public dashboardservice: DashboardService,private toast :Toast,public paymentservice:PaymentService,private modalCtrl:ModalController, private alertCtrl:AlertController,private router:Router,private route: ActivatedRoute,    private fb:FormBuilder) {
  this.cashprint = this.fb.group({
    mobilenumber: ['',[Validators.required,Validators.maxLength(10)]]    
    })
}

ionViewWillEnter(){
 
  let token=localStorage.getItem("tokens");
  this.route.queryParams.subscribe(params => {
this.cash_print_preview = JSON.parse(params.state)
console.log(this.cash_print_preview)
this.api_id=[]
for(let i=0;i<this.cash_print_preview?.length;i++){
  this.api_id.push(this.cash_print_preview[i]['ID']);
  }
   this.paymentservice.print_details(this.api_id,token).subscribe(res=>{
    console.log(res)
  this.print_cash_page=res;
 
  }
  ,(error:HttpErrorResponse)=>{
    if(error.status ===401){           
      this.presentToast("Session timeout, please login to continue.");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){           
    this.presentToast("Session timeout / Server Error! Please login again");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
 }
 
  }
  
  )
})

}
validation_messages = {
  'mobilenumber': [
    { type: 'required', message: 'Mobile Number is Required.' },
  ],}
ngOnInit() {

  }
  previous(){
  this.router.navigateByUrl('dashboard')
  }
  logout(){
  this.router.navigateByUrl('login')
  localStorage.clear();
  
  }
  indianRupeeFormat(val: number) {
    return Number(val).toLocaleString('en-IN');
  }
  done(){
  //  this.presentToast('Payments may take upto 3 working days to get reflected in your account')
  this.router.navigateByUrl('dashboard')
  }
  
  async presentToast(message) {
    this.toast.show(message, '2000', 'bottom').subscribe(
    toast => {
    console.log(toast);
    });
    }

    async presentAlertConfirm(mob) {
    const alert = await this.alertCtrl.create({
    message: 'Please confirm the Mobile Number '+mob,
    buttons: [
    {
    text: 'Cancel',
    role: 'cancel',
    cssClass: 'secondary',
    handler: (blah) => {
    }
    }, {
    text: 'Done',
    handler: () => {
    this.paymentservice.mobdetails(mob,this.print_cash_page).subscribe(res=>{
        console.log(res)
    if(res=="OK"){
      this.presentToast("Receipt SMS successfully send to the mobile number.")
      this.router.navigateByUrl('dashboard')
    }else{
      this.presentToast("Receipt SMS not send to the mobile number.")
    }
      }
      ,(error:HttpErrorResponse)=>{
       if(error.status ===400){           
        this.presentToast("Session timeout / Server Error! Please login again");
        this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
        })
        this.router.navigate(["/login"]);
     }
     
    })
    
    }
    }
    ]
    });
    await alert.present();
    }
  }