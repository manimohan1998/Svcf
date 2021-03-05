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
  mobilepass: any;
  patternval: boolean=false;
  mob: any;

  constructor(private fb:FormBuilder,private router:Router,public commonserv: CommonApiService,public toastController: ToastController) {
    this.resetForms = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      mobilenumber: ['',Validators.maxLength(11)], 
      oldpassword: ['',[Validators.required]], 
      newpassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{10})")]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{9})"),this.equalto('newpassword')]],
   })
   
   }
     ngOnInit() {
    }
    ionViewWillEnter(){
      let mobilenumber=localStorage.getItem('memberid');
      this.commonserv.sameMobileNumber(mobilenumber).subscribe((res) => {
        this.mobilepass=res
        console.log(this.mobilepass)
        if(this.mobilepass.MobileNo.length>0){
         let mobile=this.mobilepass.MobileNo.replaceAll(' ', "")
         this.resetForms.get("mobilenumber").setValue(mobile);
         }
         else{
           this.resetForms.get('mobilenumber').reset("");
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
  

    checkMobNo(){

      this.mob=this.resetForms.get("mobilenumber").value
     var pattern=new RegExp(('[0-9]{10}') ||('[0-9]{11}'));
     console.log(pattern.test(this.mob))
     this.patternval=pattern.test(this.mob)
       }
  
   validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },],

    'mobilenumber': [
        { type: 'required', message: 'Mobile Number is required.' },],

    'oldpassword': [
          { type: 'required', message: 'Old password is required.' },],

    'newpassword': [
        { type: 'required', message: 'Newpassword is required.' },
      
        { type: 'pattern', message: 'New password should be equal to 10 characters ,one digit, one upper case letter, one lower case letter and one special symbol (“@#$%”).' }, ],

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
      if(this.mobilepass.Password==this.resetForms.get("oldpassword").value && this.patternval===true ){
       console.log(this.resetForms)
       let id= localStorage.getItem('memberid');
       let name=this.resetForms['value']['name']
       let password=this.resetForms['value']['confirmpassword']
       let number=this.resetForms['value']['mobilenumber']
       this.commonserv.reset(id,name,password,number).subscribe((res) => {
        console.log(res)
        if(res['Status']==="Success"){
          this.router.navigate(['/login'])
          localStorage.clear()
          this.presentToast('Password Changed Successfully And Use New Password To Login.');
        }
        else{
          this.presentToast('please Enter Valid Details');
          this.resetForms.get("mobilenumber").reset("");
        }
       })
      }
       else{
        this.resetForms.get("oldpassword").reset("");
        this.resetForms.get("mobilenumber").reset("");
        this.presentToast('Please Enter Valid Old Password or Mobile Number.');
      }
     }
   
  back(){
this.router.navigate(['/login'])
localStorage.clear()
  }
  ngOnDestroy(){
    this.resetForms.reset("");
  }
}
