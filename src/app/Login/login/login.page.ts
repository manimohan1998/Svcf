import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Network} from '@ionic-native/network/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import { CommonApiService } from 'src/app/Login/common-api.service';
import { AlertController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: string;
  member_id:any;
  token: any;
  constructor(private fb:FormBuilder,private network:Network,private dialogs:Dialogs,private router:Router, public commonserv: CommonApiService,public toastController: ToastController,
    private platform: Platform,public alertController:AlertController) { 
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
   })
  }
  ngOnInit() {
      this.network.onDisconnect().subscribe(()=>{
      this.dialogs.alert('Network was disconnected')
          })
      this.network.onConnect().subscribe(()=>{
      console.log(this.network.type)
      })
  }
  ionViewWillEnter(){
    this.loginForm.reset("");
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.backButtonAlert();
         });
  }
 
async backButtonAlert(){
    const alert =await this.alertController.create({
      message:'Do you want to exit app',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },{
        text: 'Close app',
        handler: () =>{
          navigator['app'].exitApp();
        }
      }]
    })
    await alert.present();
  }
   submitForm(val){        
        this.commonserv.loginCredentials(val.name,val.password).subscribe(res=>{
          console.log(res)
          console.log(val)
          this.member_id = res['MemberIDNew']
          this.token=res["JWToken"]
          console.log(this.token)
          console.log(this.member_id)
          localStorage.setItem('memberid',this.member_id) 
          localStorage.setItem('token',this.token) 
          if(res['Message'] === "Login Details Correct" && val['name'].length === val['password'].length){
            localStorage.setItem("firstdata",JSON.stringify(val));
            this.router.navigate(['/reset'])
            this.presentToast("Please Reset Your Password");
          }else if (res['Message'] === "Login Details Correct" && val['name'].length != val['password'].length){
            this.router.navigate(['/subscribe-list'])
            this.presentToast("Logged in Successfully");
          }else{
            // alert("Please Enter Valid credentials")
            this.presentToast("Please Enter Valid credentials");
            this.loginForm.reset("")
          }
        })
   
   
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
  }
  CheckSpace(event)
  {
     if(event.which ==32)
     {
        event.preventDefault();
        return false;
     }
  }

  Forgot(){
      this.router.navigate(['/forgot-password'])
  }
  
  ngOnDestroy(){
    this.loginForm.reset("");
  }
  
}
