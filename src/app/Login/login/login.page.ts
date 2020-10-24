import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Network} from '@ionic-native/network/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import { CommonApiService } from 'src/app/Login/common-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  user: string
  logindata:{};
  constructor(private fb:FormBuilder,private network:Network,private dialogs:Dialogs,private router:Router, public commonserv: CommonApiService) { 
    this.loginForm = this.fb.group({
      name: [''],
      password: [''],
   })
  }
  ngOnInit() {
      this.network.onDisconnect().subscribe(()=>{
      this.dialogs.alert('Network was disconnected')
          })
      this.network.onConnect().subscribe(()=>{
      console.log(this.network.type)
      })
  }
 
   submitForm(val){

    if(val.name==val.password){
        this.logindata={username:val.name,password:val.password}
        console.log(this.logindata)     
        // this.commonserv.loginCredentials(this.logindata).subscribe(res=>{
        //   console.log(res)
        // })
        this.router.navigate(['/subscribe-list'])
   }
   else{
     alert("access denied")
   }
  }

  Forgot(){
      this.router.navigate(['/forgot-password'])
  }
  
}
