import { Component ,ViewChild} from '@angular/core';
import { AlertController, IonRouterOutlet} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';
import { DashboardService } from '../app/services/dashboard.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { SubscriberApiService } from './subscribers/subscriber-api.service';
import { CommonApiService } from './Login/common-api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private searchEventSubscription: Subscription;
  private sub:Subscription;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  // public counter = 0;
  clickcount: any=[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    public alertController:AlertController,
    public location:Location,
    private router:Router,
    private service:DashboardService,
    public subservice:SubscriberApiService,
    private localNotifications: LocalNotifications,
    public common:CommonApiService
  ) {
   this.initializeApp();
   this.backbutton()
  }

  
offapp(){
   if(localStorage.getItem("col_id")){
    this.service.logout(localStorage.getItem("col_id")).subscribe(res=>{
      if(res){
        localStorage.clear();
        this.searchEventSubscription.unsubscribe()
      }
  })
 }
else if(localStorage.getItem("memberid")){
  this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
    if(res){
    localStorage.clear();
    this.searchEventSubscription.unsubscribe() }
  })
}
  }


  initializeApp() {
    
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      });
      this.platform.resume.subscribe(e=>{
        this.searchEventSubscription.unsubscribe()
      })
      this.searchEventSubscription=this.platform.pause.subscribe(e => {
        if(localStorage.getItem("col_id") || localStorage.getItem("memberid")){
          this.localNotifications.schedule({
            id: 1,
            text: 'SVCF will auto logout in 30secs. Open SVCF to stop it',
          });
          setTimeout(()=>{                           // <<<---using ()=> syntax
           this.offapp();
         }, 50000);
        }
      });
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
    }
    backbutton() {
      this.platform.backButton.subscribeWithPriority(1000,async ()=>{
       
        if(window.location.pathname == '/dashboard' || window.location.pathname == '' ||  window.location.pathname=='/subscribe-list'||  window.location.pathname=='/selectapp'){
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            if(localStorage.getItem("col_id")){
              this.service.logout(localStorage.getItem("col_id")).subscribe(res=>{
                if(res){
                  localStorage.clear()
                }
              })
            }else if(localStorage.getItem("memberid")){
              this.common.logout(localStorage.getItem("memberid")).subscribe(res=>{
                if(res){
                  localStorage.clear()
                }
              })
            }
            navigator['app'].exitApp(); 
            
           
          } else {
            const toast = await this.toastController.create({
              message: 'Press back again to exit App.',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
            this.lastTimeBackPress = new Date().getTime();
          }
       
         
         
        }else if(window.location.pathname=="/subscribe-list/payment-success" || window.location.pathname=="/cashprint"){
            this.presentToast("backbutton will not work during payment")
        }
        else if(window.location.pathname=="/subscribe-list/subscriber-payment" || window.location.pathname=="/subscribe-list/subscriber-recepit" || window.location.pathname=="/subscribe-list/all-chits" || window.location.pathname=="/subscribe-list/person-detail"  
        || window.location.pathname=="/subscribe-list/payforothers"){
         this.router.navigate(['/subscribe-list'])
        }else if(window.location.pathname=="/subscribe-list/show-chits"){
          this.router.navigate(['/subscribe-list/all-chits'])
        }else if(window.location.pathname=="/subscribe-list/payeccess-amount"){
          if(localStorage.getItem("excesspage")=="subscribelist"){
            this.router.navigate(["/subscribe-list"])
          }else{
            this.router.navigate(["/subscribe-list/payforothers"]);
          }
        }
        else if(window.location.pathname=="/subscribe-list/newcustomer-payment"){
          this.router.navigate(['/subscribe-list/payforothers'])
        }
        else if(window.location.pathname=="/forgot-password" || window.location.pathname=="/reset-password" || window.location.pathname=="/termscondition"){
          this.router.navigate(['/login'])
        }
        else if( window.location.pathname=="/reset"){
          if(localStorage.getItem("whichpage")=="login"){
            this.router.navigate(['/selectapp'])
            localStorage.clear()
          }else{
            this.router.navigate(['/subscribe-list/person-detail'])
          }
        }
        else if(window.location.pathname=="/login"){
          this.router.navigate(['/selectapp'])
        }else if(window.location.pathname=="/payment" || window.location.pathname=="/receipthistory"){
          this.router.navigate(['/dashboard'])
        }else if(window.location.pathname=="/payment/cash"){
          this.router.navigate(['/payment'])
        }else if(window.location.pathname=="/payment/cashpay"){
          this.router.navigate(['/cash'])
        }
  
      })
    }
   


 
}
