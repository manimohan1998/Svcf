import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import {Router} from'@angular/router'
@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  resetForms: FormGroup;

  constructor(private fb:FormBuilder,private router:Router) {
    this.resetForms = this.fb.group({
      name  : ['', [Validators.required, Validators.minLength(4)]],
      mobilenumber: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(4),this.equalto('password')]],
   })
   }
   equalto(field_name): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} => {
		let input = control.value;
		let isValid=control.root.value[field_name]==input
		if(!isValid){
		return { 'equalTo': {isValid} }
		}
		else{
		return null
		}
		}
    }

  ngOnInit() {
  }
  submitsForm(){
console.log(this.resetForms)
  }
  back(){
this.router.navigate(['/login'])
  }
}
