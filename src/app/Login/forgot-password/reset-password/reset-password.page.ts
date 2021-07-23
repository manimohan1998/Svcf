import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonApiService } from 'src/app/Login/common-api.service';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  show:boolean;
  show1:boolean;
constructor(private router:Router,private fb:FormBuilder, public commonserv: CommonApiService,public toastController: ToastController,
  private platform: Platform) { 
    this.resetForm = this.fb.group({
      newpass  : ['', [Validators.required,Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})" || /^\S*$/)]],
      confirmpass: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})" || /^\S*$/),this.equalto('newpass')]],
   })
  }

  ngOnInit() {
  }
ionViewWillEnter(){

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
    CheckSpace(event)
    {
       if(event.which ==32)
       {
          event.preventDefault();
          return false;
       }
    }
    validation_messages = {
      'newpass': [
        { type: 'required', message: 'New password is required.' },
      
        { type: 'pattern', message: 'Password should contain 8 to 20 characters ,1 digit,1 uppercase letter, 1 lowercase letter and 1 special symbol (“@#$%”) and without space.' }, ],
       
        'confirmpass': [
          { type: 'required', message: 'Confirm password is required.' },
        
          { type: 'pattern', message: 'Password should contain 8 to 20 characters ,1 digit,1 uppercase letter, 1 lowercase letter and 1 special symbol (“@#$%”) and without space.' }, ]
    }
    

  submitsForm(){
    // let data={userid:"1",password:this.resetForm['value']['newpass']}
    let password=this.resetForm['value']['newpass']
    let conpassword=this.resetForm['value']['confirmpass']
    let username=localStorage.getItem('customer')
    if(password===conpassword){
      this.commonserv.resetPassword(username,password).subscribe(res=>{
        console.log(res)
        if(res['Message']==="Password Changed Successfully"){
          this.presentToast('Password Changed Successfully.');
          this.router.navigate(['/login'])
        }
        else{
          this.presentToast('Password Changed UnSuccessfully.');
        }
       
      })
    }else{
      this.presentToast('New Password and Confirm Password Does not Match.');
    }
  
   
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
        message: message,
        duration: 2000
     });
      toast.present();
  }
  back(){
    this.router.navigate(['/login'])
  }
  ionViewWillLeave(){
    this.resetForm.reset();
  }
}
