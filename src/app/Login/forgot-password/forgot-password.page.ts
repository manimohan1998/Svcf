import { Component, ElementRef, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonApiService } from './../common-api.service';
import { Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/Rx';
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
  
  }
  submitsForm(){
   var otp_request=this.forgotForm['value']['Customer']
   this.commonserv.usertype(otp_request).subscribe(res=>{
console.log(res)
if(res['userType']=='Customer'){
  if(otp_request!==null && this.forgotForm.valid){
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
     if(res['Status']=="Success"){
     this.otp=res['OTP']
     this.otp1=true
     this.completed=true
     var callDuration = this.elementRef.nativeElement.querySelector('#time');
    this.startTimer(callDuration);
     }else{
      this.presentToast("Mobile Number is not updated for this user.Please Contact Branch");
      this.forgotForm.reset("")
      this.completed=false
      this.otp1=false
     }
    })
  }else{
    this.presentToast("Enter customer Id");
    this.forgotForm.reset("")
  }
}else{
  this.presentToast("Access denied. please contact Admin");
}
   })

  }
  startTimer(display) {
    var timer = 120;
    var seconds;
    var minutes;
    Observable.interval(1000).subscribe(x => {
        seconds = Math.floor(timer % 60);
        minutes = Math.floor(timer / 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        display.textContent = `Resend OTP in ${minutes + ":" + seconds}s`
        --timer;
        if (timer < 0 ) {
             display.textContent =  "";
             this.otp=""
             this.forgot=true;
        }
    })
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
    // this.commonserv.otpVerification(this.forgotForms.value).subscribe(res=>{
    //   console.log(res)
    // })
    var otpdata=this.forgotForms['value']['OTP']
    console.log(otpdata)
    if(otpdata==this.otp && otpdata !==null && this.forgotForms.valid){
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
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
      if(res['Status']=="Success"){
        this.otp=res['OTP']
        var callDuration = this.elementRef.nativeElement.querySelector('#time');
    this.startTimer(callDuration);
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
  ngOnDestroy(){
    this.forgotForm.reset("");
    this.forgotForms.reset("");
  }
}
