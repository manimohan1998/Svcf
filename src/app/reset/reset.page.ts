import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  resetForms: any;

  constructor(private fb:FormBuilder) {
    this.resetForms = this.fb.group({
      name  : ['', [Validators.required, Validators.minLength(4)]],
      mobilenumber: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(4)]],
   })
   }

  ngOnInit() {
  }
  submitsForm(){
console.log(this.resetForms)
  }
  back(){

  }
}
