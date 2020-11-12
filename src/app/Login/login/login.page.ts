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
  user: string;
  member_id:any;
  constructor(private fb:FormBuilder,private network:Network,private dialogs:Dialogs,private router:Router, public commonserv: CommonApiService) { 
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
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
        this.commonserv.loginCredentials(val.name,val.password).subscribe(res=>{
          console.log(res)
          this.member_id = res['MemberIDNew']
          localStorage.setItem('memberid',this.member_id)
          if(res['Message'] === "Login Details Correct" && val['name'].length === val['password'].length){
            this.router.navigate(['/reset'])
          }else if (res['Message'] === "Login Details Correct" && val['name'].length != val['password'].length){
            this.router.navigate(['/subscribe-list'])
          }else{
            alert("Please Enter Valid credentials")
          }
        })
   
   
  }

  Forgot(){
      this.router.navigate(['/forgot-password'])
  }
  ngOnDestroy(){
    this.loginForm.reset();
  }
  
}
