import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
constructor(private router:Router,private fb:FormBuilder) { 
    this.resetForm = this.fb.group({
      confirmpass: ['', [Validators.required, Validators.minLength(10)]],
      newpass: ['', [Validators.required, Validators.minLength(10)]],
   })
  }

  ngOnInit() {
  }

  submitsForm(){
    this.router.navigate(['/login'])
  }
  back(){
    this.router.navigate(['/forgot-password'])
  }
}
