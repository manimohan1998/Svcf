import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  
})
export class ForgotPasswordPage implements OnInit {
  forgotForm: FormGroup;
  forgotForms: FormGroup;
  forgot=false;
  constructor(private router:Router,private fb:FormBuilder) { 
    this.forgotForm = this.fb.group({
      Customer: ['', [Validators.required, Validators.minLength(8)]],
      mobile: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      })
   this.forgotForms = this.fb.group({
    OTP: ['', [Validators.required, Validators.maxLength(6),Validators.pattern("[0-9]{6}")]],
 })
  }

  ngOnInit() {
  }
  submitsForm(){
    console.log(this.forgotForm.value)
    this.forgot=true;
  }
  otpform(){
    this.router.navigate(['/reset-password'])
  }
  
}
