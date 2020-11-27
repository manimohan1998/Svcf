import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonApiService } from './../common-api.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;
  forgotForms: FormGroup;
  
  otp: any;
  forgot: boolean;
  constructor(private router:Router,private fb:FormBuilder, public commonserv: CommonApiService,public toastController: ToastController) { 
    this.forgotForm = this.fb.group({
      Customer: ['', [Validators.required, Validators.minLength(4)]],
      // mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      })
    this.forgotForms = this.fb.group({
      OTP: ['', [Validators.required]],
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
    console.log(this.forgotForm['value']['Customer'])
    this.forgot=true;
   var otp_request=this.forgotForm['value']['Customer']
   if(otp_request!==null && this.forgotForm.valid){
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
     if(res['Status']=="Success"){
     this.otp=res['OTP']
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
    if(otpdata==this.otp && otpdata !==null && this.forgotForms.valid && this.forgotForm.valid){
      localStorage.setItem('customer',this.forgotForm['value']['Customer'])
      this.router.navigate(['/reset-password'])
    }
   else{
      this.presentToast("Please Enter Valid Customer Id or OTP");
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
