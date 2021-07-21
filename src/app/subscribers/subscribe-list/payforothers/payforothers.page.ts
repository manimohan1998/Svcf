    import { HttpErrorResponse } from '@angular/common/http';
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators } from '@angular/forms';
    import { NavigationExtras, Router } from '@angular/router';
    import { LoadingController, Platform, ToastController } from '@ionic/angular';
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
      userlist1: any=[];
      userlist4: any=[];
      prized_chits: any=[];
      valid_chits: any=[];
      blocked_chits: any=[];
      primarycustomer: any=[];
      Extra_amountchits: any=[];
    constructor(private router:Router,
    private fb:FormBuilder,
    public toastController: ToastController,
    public platform:Platform,
    public subscribeServ: SubscriberApiService,
    public loadingcontroller:LoadingController) { 

    this.payforother = this.fb.group({
    chitnumber: ['',[Validators.required]],
    password: ['',[Validators.required]],
    // Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{10})" || /^\S*$/)
    })
    }

    ngOnInit() {
    }
    ionViewWillEnter(){
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
    localStorage.setItem('exememberid',this.memberid)
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
    } 
    else{
      this.presentToast("Server Error! Please try login again.");
      this.router.navigate(["/login"]);
     }})
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
    }
    else{
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

   async verify(){
     this.blocked_chits=[];
     this.prized_chits=[];
     this.userlist3=[];
     this.userlist4=[];
     this.valid_chits=[];
    const loading = await this.loadingcontroller.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();
    console.log(this.payforother.value.password)
    this.primarycustomer=JSON.parse(localStorage.getItem("personaldatas"))

    let token=localStorage.getItem("token")
    if(this.payforother.value.password !==this.primarycustomer[0]?.password){
    if(this.payforother.value.password===this.customerdetails.Password){
    this.presentToast("Verified Successfully");
    this.subscribeServ.getchitdetailslist(this.headid,this.customerdetails.BranchId,token).subscribe((res)=>{
    console.log(res)
    this.userlist3=res['ChitDetail']
    console.log(this.userlist3[0].IsBlocked)
    this.chitpage=true

    let token=localStorage.getItem("token")
    
    this.subscribeServ.personalDetails(this.memberid,token).subscribe((personaldetails)=>{
    console.log(personaldetails)
    this.personaldetail=personaldetails['UserDetails'];
    localStorage.setItem("newcustomerdetails",JSON.stringify(this.personaldetail))
    localStorage.setItem("exepersonaldatas",JSON.stringify(this.personaldetail))
    let token=localStorage.getItem("token")
      this.subscribeServ.subscriberList(this.memberid,this.personaldetail[0]?.BranchId,token).subscribe(res=>{
           
        this.userlist1=(res['chits']) 
        loading.dismiss();
        if (Array.isArray(this.userlist1) && this.userlist1.length){ 
         
       for(let i=0;i<this.userlist1.length;i++){
  
    if(this.userlist1[i].status=="R" || (this.userlist1[i].status=="T" && (this.userlist1[i].NonPrizedArrier!='0.00' || this.userlist1[i].PrizedArrier!='0.00'))){
        this.userlist4.push(this.userlist1[i]);
        // console.log(this.userlist4)
      }}
      for(var i=0; i<this.userlist4.length;i++){
        if(this.userlist4[i].IsPrized=='Y')  this.prized_chits.push(this.userlist4[i])
        if( this.userlist4[i].IsBlocked =="1" )  this.blocked_chits.push(this.userlist4[i])
       }
       for(var i=0; i<this.prized_chits.length;i++){
         if(this.prized_chits[i].PrizedArrier !=="0.00" || this.prized_chits[i].NonPrizedArrier!=="0.00" && this.prized_chits[i].IsBlocked =="0" )  this.valid_chits.push(this.prized_chits[i])
        
       }
     console.log(this.valid_chits?.length)
    
      }
      },(error:HttpErrorResponse)=>{
        if(error.status ===401){     
          loading.dismiss(); 
          this.presentToast("Session timeout, please login to continue.");
          this.router.navigate(["/login"]);
       }
       else if(error.status ===400){ 
        loading.dismiss();    
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
       }
       else{
        this.presentToast("Server Error! Please try login again.");
        this.router.navigate(["/login"]);
       }})
    })
    })

    }else{
      loading.dismiss();
      this.presentToast("Password Doesn't Match");

    }
  }else{
    loading.dismiss();
    this.presentToast("Not Allowed to Pay your Chit's");
  }
    }
    gotolist(){
      this.Extra_amountchits=[];
      for(var i=0; i<this.arrayvalue.length;i++){
        if(this.arrayvalue[i].PrizedArrier=='0.00' && this.arrayvalue[i].NonPrizedArrier=='0.00' && this.arrayvalue[i].Interest=='0' && this.arrayvalue[i].CurrentDueAmount=='0.00')  this.Extra_amountchits.push(this.arrayvalue[i])
       }
      if(this.arrayvalue?.length !=0){
        if(this.blocked_chits?.length !=0){
          this.presentToast("chit's are blocked. Please contact admin");
        }else{
          if(this.userlist3[0]?.IsPrized=='Y' && this.Extra_amountchits.length==0){
            this.arrayvalue=[];
            this.arrayvalue.push(this.userlist3[0]);
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
            queryParams: { state:data },
        };
            this.router.navigate(["/subscribe-list/newcustomer-payment"],navigationExtras)
          }
          else if(this.userlist3[0]?.IsPrized=='N' && this.valid_chits?.length==0 && this.Extra_amountchits.length==0){
            this.arrayvalue=[];
            this.arrayvalue.push(this.userlist3[0]);
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
            queryParams: { state:data },
        };
            this.router.navigate(["/subscribe-list/newcustomer-payment"],navigationExtras)
          }else if(this.Extra_amountchits.length !=0){
            let data = JSON.stringify(this.arrayvalue)
            let navigationExtras: NavigationExtras = {
             queryParams: { state:data },
             
           };
           localStorage.setItem("excesspage","payforother")
         this.router.navigate(["/subscribe-list/payeccess-amount"],navigationExtras)
          }
           else return this.presentToast("Sorry! Prized Chits are preferred");
        }
  
    }else return this.presentToast("Please choose atleast one chit");
  }
    passParams(event,val:any){
      if(event.detail.checked){
        this.arrayvalue.push(val);
        }
      if (!event.detail.checked) {
        let index = this.arrayvalue.indexOf(val);
      if (index > -1) {
        this.arrayvalue.splice(index, 1);
        }
      }
      }
      blockchits(val){
        if(val.IsBlocked==1){
          this.presentToast(" This chit Number " +val.ChitNo+ `is blocked , Due to ${val.BlockReason}`);
        }
      }
    }

