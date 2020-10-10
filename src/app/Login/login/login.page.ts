import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Network} from '@ionic-native/network/ngx';
import {Dialogs} from '@ionic-native/dialogs/ngx';
import { CommonApiService } from './../login/common-api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  emp=false;
  cus=false;
  user: string
  logindata:{};
  constructor(private fb:FormBuilder,private network:Network,private dialogs:Dialogs,private router:Router, public commonserv: CommonApiService) { 
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
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

   submitForm(val){
        this.logindata={username:val.name,password:val.password}
        console.log(this.logindata)
        // this.commonserv.loginCredentials(this.logindata).subscribe(res=>{
        //   console.log(res)
        // })
        this.router.navigate(['/subscribe-list'])

 }

  Forgot(){
      this.router.navigate(['/forgot-password'])
  }

}
