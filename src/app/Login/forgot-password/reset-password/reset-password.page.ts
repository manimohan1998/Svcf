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
constructor(private router:Router,private fb:FormBuilder, public commonserv: CommonApiService,public toastController: ToastController,
  private platform: Platform) { 
    this.resetForm = this.fb.group({
      newpass  : ['', [Validators.required,Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{10})")]],
      confirmpass: ['', [Validators.required, Validators.minLength(8),Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{10})"),this.equalto('newpass')]],
   })
  }

  ngOnInit() {
  }
ionViewWillEnter(){
  this.platform.backButton.subscribeWithPriority(1, () => {
    this.router.navigateByUrl('/forgot-password')
       });
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
      
        { type: 'pattern', message: 'New password should be equal to 10 characters ,one digit, one upper case letter, one lower case letter and one special symbol (“@#$%”).' }, ],
       
        'confirmpass': [
          { type: 'required', message: 'Confirm password is required.' },
        
          { type: 'pattern', message: 'New password should be equal to 10 characters ,one digit, one upper case letter, one lower case letter and one special symbol (“@#$%”).' }, ]
    }
    

  submitsForm(){
    // let data={userid:"1",password:this.resetForm['value']['newpass']}
    let password=this.resetForm['value']['newpass']
    let username=localStorage.getItem('customer')
    this.commonserv.resetPassword(username,password).subscribe(res=>{
      console.log(res)
      if(res['Message']==="Password Changed Successfully"){
        this.presentToast('Password Changed Successfully.');
        this.router.navigate(['/login'])
      }
      else{
        this.presentToast('Password Changed unSuccessfully.');
      }
     
    })
   
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
  ngOnDestroy(){
    this.resetForm.reset("");
  }
}
