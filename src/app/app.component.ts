import { Component ,ViewChild} from '@angular/core';
import { AlertController, IonRouterOutlet} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
    private router:Router
  ) {
   this.initializeApp();
   this.backbutton()
  }

  initializeApp() {
    // this.statusBar.backgroundColorByHexString('#30ADFF');
    // this.splashScreen.hide();
    
    this.platform.ready().then(() => {
      this.splashScreen.hide();
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
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work in ionic 4

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
        }
        else if(window.location.pathname=="/subscribe-list/newcustomer-payment"){
          this.router.navigate(['/subscribe-list/payforothers'])
        }
        else if(window.location.pathname=="/forgot-password" || window.location.pathname=="/reset-password"){
          this.router.navigate(['/login'])
        }
        else if( window.location.pathname=="/reset"){
          if(localStorage.getItem("whichpage")=="login"){
            this.router.navigate(['/login'])
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
