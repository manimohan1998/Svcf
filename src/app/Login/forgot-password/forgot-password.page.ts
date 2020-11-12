import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonApiService } from './../common-api.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;
  forgotForms: FormGroup;
  forgot=false;
  otp: any;
  constructor(private router:Router,private fb:FormBuilder, public commonserv: CommonApiService) { 
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
   let otp_request=this.forgotForm['value']['Customer']
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
     
    })
  }
  otpform(){
    // this.commonserv.otpVerification(this.forgotForms.value).subscribe(res=>{
    //   console.log(res)
    // })
    localStorage.setItem('customer',this.forgotForm['value']['Customer'])
    this.router.navigate(['/reset-password'])
  }
  resend(){
    let otp_request=this.forgotForm['value']['Customer']
    this.commonserv.requestOtp(otp_request).subscribe(res=>{
      console.log(res)
     
    })
  }
  back(){
    this.router.navigate(['/login'])
  }
  ngOnDestroy(){
    this.forgotForm.reset();
    this.forgotForms.reset();
  }
}
