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
  counter: number;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController: ToastController,
    public alertController:AlertController,
    public location:Location,
    private router:Router
  ) {
    this.backButtonEvent()
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.backgroundColorByHexString('#30ADFF');
    if(navigator.onLine){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      },10000);
    });
  }else{
    this.presentToast("Please Check Network Connection...");
  }
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
    }
    backButtonEvent(){
    //  this.platform.ready().then(() => {
    //   document.addEventListener("backbutton", () => {
    //   if(this.router.url == "/" || this.router.url == "/tabs/tab1"){
    //     if (this.counter == 0) {
    //       this.counter++;
    //      this.backButtonAlert()
    //       setTimeout(() => { this.counter = 0 }, 2000)
    //     }
    //     else if
    //     else {
    //       navigator['app'].exitApp();
    //       }
    //     }
    //   });
    // })
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
