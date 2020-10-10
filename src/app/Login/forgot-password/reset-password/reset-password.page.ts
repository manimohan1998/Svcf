import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonApiService } from './../../common-api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
constructor(private router:Router,private fb:FormBuilder, public commonserv: CommonApiService) { 
    this.resetForm = this.fb.group({
      newpass  : ['', [Validators.required, Validators.minLength(4)]],
      confirmpass: ['', [Validators.required, Validators.minLength(4),this.equalto('newpass')]],
   })
  }

  ngOnInit() {
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

  submitsForm(){
    //let data={userid:"1",password:this.resetForm['value']['newpass']}
    // this.commonserv.resetPassword(data).subscribe(res=>{
    //   console.log(res)
    // })
    this.router.navigate(['/login'])
  }
  back(){
    this.router.navigate(['/forgot-password'])
  }
}
