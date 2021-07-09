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
  @ViewChild(IonRouterOutlet, { static : true}) routerOutlet: IonRouterOutlet;
  counter: number=0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    public alertController:AlertController,
    public location:Location,
    private router:Router
  ) {
    this.initializeBackButtonCustomHandler()
    this.initializeApp();
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
    initializeBackButtonCustomHandler() {
      this.platform.backButton.subscribeWithPriority(1,()=>{
       
        if(window.location.pathname == '/dashboard' || window.location.pathname == '' ||  window.location.pathname=='/subscribe-list'||  window.location.pathname=='/selectapp'){
          this.backButtonAlert();
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
        else if(window.location.pathname=="/forgot-password" || window.location.pathname=="/reset-password" || window.location.pathname=="/reset"){
          this.router.navigate(['/login'])
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
    async backButtonAlert(){
      const alert =await this.alertController.create({
        message:'Do you want to exit app',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },{
          text: 'Close app',
          handler: () =>{
            navigator['app'].exitApp();
          }
        }]
      })
      await alert.present();
    }

 
}
