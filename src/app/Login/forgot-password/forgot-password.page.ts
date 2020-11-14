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
      OTP: ['', [Validators.required, Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],
     })
  }

  ngOnInit() {
  }
  submitsForm(){
    console.log(this.forgotForm['value']['Customer'])
    this.forgot=true;
   var otp_request=this.forgotForm['value']['Customer']
   if(otp_request!==null && this.forgotForm.valid){
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
     if(res['status']=="success"){
     this.otp=res['Message']
     }else{
      this.forgotForm.reset("");
      this.presentToast("Mobile Number is not updated for this User.Please Contact Branch");
     }
    })
  }else{
    this.presentToast("Enter a valid customer Id");
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
    if(otpdata==this.otp){
      localStorage.setItem('customer',this.forgotForm['value']['Customer'])
      this.router.navigate(['/reset-password'])
    }else{
      this.presentToast("Please Enter Valid OTP");
      this.forgotForms.reset("");
    }
   
  }
  resend(){
   
    var otp_request=this.forgotForm['value']['Customer']
    if(otp_request !==null && this.forgotForm.valid){
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
      if(res['status']=="success"){
        this.otp=res['Message']
       
        }else{
          this.forgotForm.reset("");
          this.presentToast("Mobile Number is not updated for this User.Please Contact Branch");
        }
    })
  }else{
    this.presentToast("Enter a valid customer Id");
  }
  }
  back(){
    this.router.navigate(['/login'])
  }
  ngOnDestroy(){
    this.forgotForm.reset();
    this.forgotForms.reset();
  }
}
