    import { HttpErrorResponse } from '@angular/common/http';
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { NavigationExtras, Router } from '@angular/router';
    import { Platform, ToastController } from '@ionic/angular';
    import { SubscriberApiService } from '../../subscriber-api.service';

    @Component({
    selector: 'app-payforothers',
    templateUrl: './payforothers.page.html',
    styleUrls: ['./payforothers.page.scss'],
    })
    export class PayforothersPage implements OnInit {
    payforother: FormGroup;
    customerdetails: any=[];
    valid: boolean=false;
    headid: any;
    memberid:any;
    userlist3: any=[];
    chitpage: boolean=false;
    personaldetail: any=[];
    arrayvalue: any=[];
    show:boolean;
    constructor(private router:Router,
    private fb:FormBuilder,
    public toastController: ToastController,
    public platform:Platform,
    public subscribeServ: SubscriberApiService) { 

    this.payforother = this.fb.group({
    chitnumber: ['',[Validators.required]],
    password: ['',[Validators.required,Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{10})" || /^\S*$/)]],
    })
    }

    ngOnInit() {
    }
    ionViewWillEnter(){
    this.platform.backButton.subscribeWithPriority(1, () => {
    this.router.navigateByUrl('/subscribe-list')
    });
    }
    back(){
    this.router.navigate(["/subscribe-list"])
    }
    checking(){
    if(this.payforother.get(['chitnumber']).valid){
    this.valid=false
    this.customerdetails=[];
    console.log(this.payforother.value.chitnumber)
    let token=localStorage.getItem("token")
    this.subscribeServ.chitnumbercheck(this.payforother.value.chitnumber,token).subscribe((res)=>{
    console.log(res)
    if(res['GrpMemberID']){
    this.headid=res['HeadId']
    this.memberid=res['MemberId']
    localStorage.setItem("newcusmemid",this.memberid)
    this.subscribeServ.getchitdetails(res['MemberId'],res['HeadId'],token).subscribe((res1)=>{
    console.log(res1)
    this.customerdetails=res1
    this.valid=true
    },(error:HttpErrorResponse)=>{
    if(error.status ===401){          
      this.presentToast("Session timeout, please login to continue.");
      this.router.navigate(["/login"]);
    }
    else if(error.status ===400){        
    this.presentToast("Server Error! Please try login again.");
    this.router.navigate(["/login"]);
    } })
    }else{
    this.presentToast(res['message'])
    }
    },(error:HttpErrorResponse)=>{
    if(error.status ===401){          
    this.presentToast("Session timeout, please login to continue.");
    this.router.navigate(["/login"]);
    }
    else if(error.status ===400){        
    this.presentToast("Server Error! Please try login again.");
    this.router.navigate(["/login"]);
    } })
    }else{
    this.presentToast("please Enter Chit Number");
    }

    }
    async presentToast(message) {
    const toast = await this.toastController.create({
    message: message,
    duration: 2000
    });
    toast.present();
    }
    caps(value){
    this.payforother.get(['chitnumber']).setValue(value.toUpperCase())
    }

    verify(){
    console.log(this.payforother.value.password)
    let token=localStorage.getItem("token")
    if(this.payforother.value.password===this.customerdetails.Password){
    this.presentToast("Verified Successfully");
    this.subscribeServ.getchitdetailslist(this.headid,this.customerdetails.BranchId,token).subscribe((res)=>{
    console.log(res)
    this.userlist3=res['ChitDetail']
    this.chitpage=true

    let token=localStorage.getItem("token")
    this.subscribeServ.personalDetails(this.memberid,token).subscribe((personaldetails)=>{
    console.log(personaldetails)
    this.personaldetail=personaldetails['UserDetails'];
    localStorage.setItem("newcustomerdetails",JSON.stringify(this.personaldetail))
    })
    })

    }
    }
    gotolist(){
    this.arrayvalue=[];
    this.arrayvalue.push(this.userlist3[0]);
    let data = JSON.stringify(this.arrayvalue)
    let navigationExtras: NavigationExtras = {
    queryParams: { state:data },

    };
    this.router.navigate(["/subscribe-list/newcustomer-payment"],navigationExtras)
    }
    }

