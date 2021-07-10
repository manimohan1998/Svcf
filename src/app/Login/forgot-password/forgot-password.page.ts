import { Component, ElementRef, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonApiService } from './../common-api.service';
import { Platform, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;
  forgotForms: FormGroup;
  completed: boolean=false;
  otp: any;
  forgot: boolean;
  otp1: boolean;

  maxTime: any=120;
  hidevalue: boolean;
  
  constructor(private router:Router,private elementRef: ElementRef,private fb:FormBuilder, public commonserv: CommonApiService,public toastController: ToastController,
    private platform: Platform) { 
    this.forgotForm = this.fb.group({
      Customer: ['', [Validators.required,Validators.pattern(/^\S*$/)]],
      // mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      })
    this.forgotForms = this.fb.group({
      OTP: ['', [Validators.required,Validators.pattern('^[1-9][0-9]{3}$')]],
     })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.forgotForm.reset("");
    this.forgotForms.reset("");
    this.forgot=false;
    this.completed=false
    this.otp1=false
    this.maxTime=120;
  
  }
  submitsForm(){
   var otp_request=this.forgotForm['value']['Customer']
   this.commonserv.usertype(otp_request).subscribe(res=>{
console.log(res)
if(res['userType']=='Customer'){
  if(otp_request!==null && this.forgotForm.valid){
   if(res['Status']=="Success"){
     this.otp=res['OTP']
     this.otp1=true
     this.completed=true
     this.StartTimer()
     }else{
      this.presentToast("Mobile Number is not updated for this user.Please Contact Branch");
      this.forgotForm.reset("")
      this.completed=false
      this.otp1=false
     }
   
  }else{
    this.presentToast("Enter customer Id");
    this.forgotForm.reset("")
  }
}else{
  this.presentToast("Access denied. please contact Admin");
}
   })

  }

timer:any;
  StartTimer(){
this.timer = setTimeout(x => 
      {
          if(this.maxTime <= 0) { }
          this.maxTime -= 1;

          if(this.maxTime>0){
            this.hidevalue = false;
            this.StartTimer();
          }
          
          else{
              this.hidevalue = true;
              this.otp=""
              this.forgot=true
          }

      }, 1000);
 

  }
  CheckSpace(event)
  {
     if(event.which ==32)
     {
        event.preventDefault();
        return false;
     }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
  }
  otpform(){
   var otpdata=this.forgotForms['value']['OTP']
    console.log(otpdata)
    
    if(otpdata==this.otp && this.forgotForms.valid){
      localStorage.setItem('customer',this.forgotForm['value']['Customer'])
      this.router.navigate(['/reset-password'])
 
    }
   else{
      this.presentToast("Please Enter Valid OTP");
      this.forgotForms.reset("");
    }
   
  }
  resend(){
   
    var otp_request=this.forgotForm['value']['Customer']
    if(otp_request !==null && this.forgotForm.valid){
      this.commonserv.usertype(otp_request).subscribe(res=>{
      console.log(res)
      if(res['Status']=="Success"){
        this.otp=res['OTP']
        console.log(this.otp)
        this.maxTime=120;
        this.StartTimer()
  
        }else{
       this.presentToast("Mobile Number is not updated for this User.Please Contact Branch");
       this.forgotForm.reset("")
        }
    })
  }else{
    this.presentToast("Enter a valid customer Id");
    this.forgotForm.reset("")
  }
  }
  back(){
    this.router.navigate(['/login'])
  }
  ionViewWillLeave(){
      this.hidevalue = true
      clearInterval(this.timer)
    
  }
  ngOnDestroy(){
   
    this.forgotForm.reset("");
    this.forgotForms.reset("");
  }
}
