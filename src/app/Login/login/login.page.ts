import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Network} from '@ionic-native/network/ngx'
import {Dialogs} from '@ionic-native/dialogs/ngx'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
 emp=false;
 cus=false;
  user: string;
  constructor(private fb:FormBuilder,private network:Network,private dialogs:Dialogs,private router:Router) { 
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
   })
  }
  ngOnInit() {
    this.network.onDisconnect().subscribe(()=>{
      this.dialogs.alert('Network was disconnected')
          })
          this.network.onConnect().subscribe(()=>{
            setTimeout(()=>{
      this.dialogs.alert('we got a '+this.network.type+'connection');
            },2000);
          })
  }
  employee(){
this.emp=true;
this.cus=false;
localStorage.setItem('user',"employee");
this.loginForm.reset();
}
  customer(){
this.cus=true;
this.emp=false;
localStorage.setItem('user',"customer");
this.loginForm.reset();
  }

  submitForm(){
    console.log(this.loginForm.value)
    console.log(localStorage.getItem('user'))
    this.user=localStorage.getItem('user')
if(this.cus==true && this.emp==false && this.user=="customer"){
  this.router.navigate(['/subscribe-list'])
}
 if(this.cus==false && this.emp==true && this.user=="employee"){
  this.router.navigate(['/customer-list'])
}
}
  Forgot(){
    this.router.navigate(['/forgot-password'])
  }
}
