import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import {Router} from'@angular/router'
import { CommonApiService } from 'src/app/Login/common-api.service';
import { ToastController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  resetForms: FormGroup;

  constructor(private fb:FormBuilder,private router:Router,public commonserv: CommonApiService,public toastController: ToastController) {
    this.resetForms = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      mobilenumber: ['', [Validators.required, Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      oldpassword: ['',[Validators.required]], 
      newpassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{9})")]],
      confirmpassword: ['', [Validators.required, Validators.minLength(4),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{9})"),this.equalto('newpassword')]],
   })
   }
     ngOnInit() {
     }
     CheckSpace(event)
{
   if(event.which ==32)
   {
      event.preventDefault();
      return false;
   }
}

  checkname(){
   let names=this.resetForms.get('name').value
   if(names.length>=5){
   this.commonserv.sameUsername(names).subscribe((res) => {
      if(res['Message'] === "UserName is Available"){
       this.presentToast('UserName is valid.');
     }
      if(res['Message'] === "UserName is not Available"){
       this.presentToast('UserName is invalid.');
       this.resetForms.get('name').reset("");
     }
     })
    }
  }
   async presentToast(message) {
      const toast = await this.toastController.create({
          message: message,
          duration: 2000
       });
        toast.present();
    }
  

  //   checkMobNo(){
  //     let mobilenumber=this.resetForms.get('mobilenumber').value
  //  if(mobilenumber.length==10){
  //  this.commonserv.sameMobileNumber(mobilenumber).subscribe((res) => {
  //     if(res['Message'] === "mobilenumber is Available"){
  //     this.presentToast1('mobile number is valid');
  //    }
  //     if(res['Message'] === "mobilenumber is not Available"){
  //       this.presentToast1('mobile number is invalid');
  // this.resetForms.get('mobilenumber').reset("");
  //    }
  //    })
  //   }
  // }
  //  async presentToast1(message) {
  //     const toast = await this.toastController.create({
  //         message: message,
  //         duration: 2000
  //      });
  //       toast.present();
  //   }
 

   validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },],

    'mobilenumber': [
        { type: 'required', message: 'Mobile Number is required.' },],

    'oldpassword': [
          { type: 'required', message: 'Old password is required.' },],

    'newpassword': [
        { type: 'required', message: 'Newpassword is required.' },
      
        { type: 'pattern', message: 'New password must be at least 9 characters ,one digit, one upper case letter, one lower case letter and one special symbol (“@#$%”).' }, ],

    'confirmpassword': [
        { type: 'required', message: 'Confirm Password is required.' },],
    
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

submitsForm(val){
console.log(this.resetForms)
  }
  back(){
this.router.navigate(['/login'])
  }
}
