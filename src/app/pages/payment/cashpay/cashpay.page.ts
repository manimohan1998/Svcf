import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { PaymentService } from '../../../services/payment.service';
import 'moment/locale/pt-br';
import * as moment from 'moment';
import {format} from "date-fns";
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Toast } from '@ionic-native/toast/ngx';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
selector: 'app-payment',
templateUrl: './cashpay.page.html',
styleUrls: ['../payment.page.scss'],
})
export class CashPayPage implements OnInit {
today = Date.now();
submitForm: FormGroup;
new_id: any
new: any;
new_value: any;
edit_value: any;
new_array: any = [];
cashpdata: any;
grandtotal1:any;
nedate: any;
day: any;
month: any;
year: any;
new10: any;
sampletest_check:any;
cashdata: any = [];
cashdat: any = [];
sampletest: any;
cashdata1: any = [];
cashdata2: any = [];
pdata: any;
count: number = 1111;
branch1: any = [];
branch_new: any;
head: any;
sampletest1: any;
sampledata: any = [];
trigger:number=0;
sampledata1: any = [];
num: any;
vnum: any;
receipt_res: any;
num1: any = [];
vnum1: any = [];
ReceiptTable: any;
res_status: any;
ReceiptTable1: any = [];
sampleinterest: any = [];
message: any;
voucher_res: any;
sampletestcheck: any = [];
voucher_print: any;
second_voucher: any;
newarr: any;
isLoading = false;
post_id:any;
grand_total:any;
new_total:any=[];
result:any;
receipt_name:any;
trigger_sum:any;
new_name:any;
voucher_count:any;
newvoucher_count:any;
B_Groups: any=[];
  arraydata: any=[];
  Receipt_code: any;
  todaypaidamount: any;
  totals: number;
  todayvalue: any;
  userdata: any=[];
  total1: boolean;
constructor(private fb: FormBuilder,public dashboardservice:DashboardService,private toast: Toast,private http: HttpClient, public loadingController: LoadingController, private router: Router, private route: ActivatedRoute, public paymentservice: PaymentService) {
this.route.queryParams.subscribe(params => {
if (this.router.getCurrentNavigation().extras.state) {
this.new = this.router.getCurrentNavigation().extras.state.user6;
this.new10 = this.router.getCurrentNavigation().extras.state.user10;
console.log(this.new10)
this.B_Groups=[]
for (let i = 0; i < this.new10.length; i++) {
  this.B_Groups.push(this.new10[i].B_Group)
this.branch_new = (this.new10[i].BranchID);
this.head = (this.new10[i].headID);
this.branch1.push(this.branch_new);
this.sampletest1 = [{
BranchID: this.new10[i].BranchID,
HeadID: this.new10[i].headID
}]
this.sampledata.push(this.sampletest1);
this.sampledata1 = [].concat.apply([], this.sampledata);
}
this.new_array = this.new;
}
})
}
ngOnInit() {
  // console.log(Date.now)

  console.log(this.day,this.month,this.year)
  let token1=localStorage.getItem("tokens");
  this.userdata=JSON.parse(localStorage.getItem("user2"))
  let id=this.userdata["MemberID"]
  
  this.totals=0;
  this.todayvalue=localStorage.getItem("totalamounts")
  this.paymentservice.toddayamount(id,token1).subscribe(res=>{
    this.todaypaidamount= res
    console.log(this.todaypaidamount)
if(this.todaypaidamount>-1){
    this.totals +=parseFloat (this.todaypaidamount)
    this.totals += parseFloat(this.todayvalue.replace(/,/g,''))
    console.log(this.totals)
    if(this.totals<200000){
    this.total1=true
    }
    else{
      this.total1=false
    }
  }
  console.log(this.total1)
}
,(error:HttpErrorResponse)=>{
  if(error.status ===401){        
    this.presentToast("Session timeout, please login to continue.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){      
  this.presentToast("Server Error! Please try login again.");
  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
  })
  this.router.navigate(["/login"]);
}

})



  function colName(n) {
    var ordA = 'a'.charCodeAt(0);
    var ordZ = 'z'.charCodeAt(0);
    var len = ordZ - ordA + 1;
  
    var s = "";
    while(n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s;
  }
  
  // Example:
  this.arraydata=[]
  for(let n = 0; n < 18278; n++){
    var val=  colName(n)
    this.arraydata.push(val)
  }
  console.log(this.arraydata)



 let token=localStorage.getItem("tokens");
this.paymentservice.receiptseries('BCAPP',token).subscribe(res=>{
this.voucher_count=res;
console.log(this.voucher_count)
},(error:HttpErrorResponse)=>{
  if(error.status ===401){           
    this.presentToast("Session timeout, please login to continue.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
 }
 else if(error.status ===400){         
  this.presentToast("Server Error! Please try login again.");
  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
  })
  this.router.navigate(["/login"]);
}

})
this.paymentservice.receiptseries1('BCAPP',token).subscribe(res=>{
  this.Receipt_code=res;
  console.log(this.Receipt_code)
  },(error:HttpErrorResponse)=>{
    if(error.status ===401){          
      this.presentToast("Session timeout, please login to continue.");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
   }
   else if(error.status ===400){         
    this.presentToast("Server Error! Please try login again.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
  }
  
  })
var num=0;
this.result = this.new_array.map(function(el) {
var o = Object.assign({}, el);
o.total = +el.amountpayable.replace(/,/g,'') + +el.interest.replace(/,/g,'') + +el.otheramount.replace(/,/g,'');
o.total1=Number(parseFloat(o.total).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
})
return o;
})
console.log(this.result,"res")
for (let i=0;i<this.result.length;i++){
  if(this.result[i].interest != "" && this.result[i].otheramount == ""){
    this.result[i].otheramount=0;
  }
  else if(this.result[i].otheramount != "" && this.result[i].interest == ""){
    this.result[i].interest=0;
  }
  else if(this.result[i].interest == "" && this.result[i].otheramount== ""){
    this.result[i].interest=0;
    this.result[i].otheramount=0;
  }
  else if(this.result[i].amountpayable == ""){
    this.result[i].amountpayable=0;

  }
  num+=(parseFloat( this.result[i].total))
  this.grand_total=num;
    this.grandtotal1=Number(parseFloat(this.grand_total).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
})
  }

  this.post_id= localStorage.getItem('col_id')
  this.nedate = new Date();
  // this.day = moment(this.nedate.toLocaleString()).format("DD");
  // this.month = moment(this.nedate.toLocaleString()).format("MM");
  // this.year = moment(this.nedate.toLocaleString()).format("YYYY");
  this.submitForm = new FormGroup({
  formArrayName: this.fb.array([])
  })
  this.buildForm1();
  }
  buildForm1() {
  const controlArray = this.submitForm.get('formArrayName') as FormArray;
  Object.keys(this.result).forEach((i) => {
  controlArray.push(
  this.fb.group({
  branchprefix: new FormControl(this.result[i].branchprefix, Validators.required),
  branchname: new FormControl(this.result[i].branchname, Validators.required),
  groupno: new FormControl(this.result[i].groupno, Validators.required),
  totalchit: new FormControl(this.result[i].totalchit, Validators.required),
  branchid: new FormControl(this.result[i].branchid, Validators.required),
  memberid: new FormControl(this.result[i].memberid, Validators.required),
  m_id: new FormControl(this.result[i].m_id, Validators.required),
  rootid: new FormControl(this.result[i].rootid, Validators.required),
  headid: new FormControl(this.result[i].headid, Validators.required),
  chitgroupid: new FormControl(this.result[i].chitgroupid, Validators.required),
  agreement: new FormControl(this.result[i].agreement, Validators.required),
  installment: new FormControl(this.result[i].installment, Validators.required),
  amountreceived: new FormControl(this.new_array[i].amountreceived),
    amountpayable: new FormControl(this.new_array[i].amountpayable),

  prizedarrear: new FormControl(this.new_array[i].prizedarrear),
  nonprizedarrear: new FormControl(this.new_array[i].nonprizedarrear),
  interest: new FormControl(this.result[i].interest),
  otheramount: new FormControl(this.result[i].otheramount),
  // narration: new FormControl(this.result[i].narration)
  })
  )
  })
  console.log(controlArray)
  }
  previous() {
  this.router.navigateByUrl('payment/cash')
  }
  edit() {
  let navigationExtras: NavigationExtras = {
  state: {
  user7: true,
  user8: this.new_array
  }
  };
  this.router.navigate(['payment/cash'], navigationExtras);
  }


submitfunction(s){
    this.present();
    if(this.totals<200000 && this.total1==true){
    this.submitcash(s);
    }
    else{
      this.dismiss();
      console.log("max limit")
      this.presentToast1("You have exceeded the Cash limit of ₹2 lakh/day")
    }
  
}

 submitcash(s) {
 this.sampletest = s.formArrayName;
  console.log(this.sampletest)
 this.paymentservice.cash_details(this.sampledata1,localStorage.getItem("tokens")).subscribe(res => {
  console.log(res);
  this.receipt_res = res;
  if (this.receipt_res != null) {
  for (let i = 0; i < this.receipt_res.length; i++) {
  console.log(this.receipt_res[i].AlreadyusedNo);
  this.num = this.receipt_res[i].AlreadyusedNo + 1;
  this.vnum = this.receipt_res[i].BranchName + '' + this.num;
  this.num1.push(this.num);
  console.log(this.num1);
  this.vnum1.push(this.vnum)
  console.log(this.vnum1)
  this.ReceiptTable = {
  "AlreadyusedNo": this.num,
  "BranchID": this.receipt_res[i].BranchID,
  "HeadID": this.receipt_res[i].HeadID,
  "BranchName": this.receipt_res[i].BranchName,
  "From": this.receipt_res[i].From,
  "ID": this.receipt_res[i].ID,
  "Isfinished": this.receipt_res[i].Isfinished,
  "To": this.receipt_res[i].To,
  "VoucherCode": this.receipt_res[i].VoucherCode,
  "VoucherNumber": this.vnum
  };
  console.log(this.ReceiptTable);
  this.ReceiptTable1.push(this.ReceiptTable);
  console.log(this.ReceiptTable1);
  }
  this.paymentservice.receipt_update(this.ReceiptTable1,localStorage.getItem("tokens")).subscribe(res => {
  console.log(res);
  this.res_status = res;
  console.log(this.res_status)
  if (this.res_status == 0) {
  for (let obj of this.sampletest) {
  console.log("object:", obj);
  for (let key in obj) {
  }
  }
  for (let i = 0; i < this.sampletest.length; i++) {
   
  this.sampletest[i].prizedarrear = this.sampletest[i].prizedarrear.replace(/,/g, '');
  this.sampletest[i].nonprizedarrear = this.sampletest[i].nonprizedarrear.replace(/,/g, '');
  this.sampletest[i].amountreceived = this.sampletest[i].amountreceived.replace(/,/g, '');
if(this.sampletest[i].amountpayable != ""){
  this.sampletest[i].amountpayable= this.sampletest[i].amountpayable.replace(/,/g, '');

}
else{
  this.sampletest[i].amountpayable =0;
}
console.log(this.sampletest[i].interest)

  // var strFirstThree = this.sampletest[i].branchprefix.substring(0,3).toUpperCase();;
  var strFirstThree = this.sampletest[i].branchprefix;
  this.voucher_count +=1

  if(this.voucher_count>9999999){
    this.voucher_count=1;
    this.Receipt_code +=1
}
  let number=this.padLeadingZeros(this.voucher_count, 7);
  this.newvoucher_count=number;
  console.log(this.newvoucher_count,"dashb")
  this.new_name=strFirstThree;
  //this.voucher_count=this.voucher_count+1;
  console.log(this.trigger,"trigg")
  let receiptcount=this.arraydata[this.Receipt_code].toUpperCase()
  this.receipt_name='B' + '-'+ this.new_name+localStorage.getItem('col_id')+'-'+receiptcount+ this.newvoucher_count;
  console.log(this.receipt_name,"rec")
  if(this.sampletest[i].prizedarrear !=0 ){
  this.cashpdata = [
  {
  "Amount": this.sampletest[i].amountpayable,
  "PArrear":this.sampletest[i].prizedarrear,
    "CurrentDue":this.sampletest[i].amountreceived,
  "B_Group":this.B_Groups[i],
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count = this.count + 1,
  "Voucher_Type": "C",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "Cash",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": this.sampletest[i].amountpayable,
    "CurrentDue":this.sampletest[i].amountreceived,
    "B_Group":this.B_Groups[i],
  "PArrear":this.sampletest[i].prizedarrear,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count,
  "IsAccepted": "0",
  "Voucher_Type": "D",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "Cash",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
  "Interest":this.sampletest[i].interest,
  "B_Group":this.B_Groups[i],
  "OtherAmt":this.sampletest[i].otheramount,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count = this.count + 1,
  "Voucher_Type": "C",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "DefaultInterest",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
  "Interest":this.sampletest[i].interest,
  "B_Group":this.B_Groups[i],
  "OtherAmt":this.sampletest[i].otheramount,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count,
  "Voucher_Type": "D",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "DefaultInterest",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  }
  ]
  }
  else if(this.sampletest[i].nonprizedarrear != 0){
  this.cashpdata = [
  {
  "Amount": this.sampletest[i].amountpayable,
  "CurrentDue":this.sampletest[i].amountreceived,
  "B_Group":this.B_Groups[i],
  "NPArrear":this.sampletest[i].nonprizedarrear,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count = this.count + 1,
  "Voucher_Type": "C",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "Cash",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": this.sampletest[i].amountpayable,
  "CurrentDue":this.sampletest[i].amountreceived,
  "B_Group":this.B_Groups[i],
  "NPArrear":this.sampletest[i].nonprizedarrear,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count,
  "IsAccepted": "0",
  "Voucher_Type": "D",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "Cash",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
  "Interest":this.sampletest[i].interest,
  "OtherAmt":this.sampletest[i].otheramount,
  "B_Group":this.B_Groups[i],
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count = this.count + 1,
  "Voucher_Type": "C",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "DefaultInterest",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
  "Interest":this.sampletest[i].interest,
  "B_Group":this.B_Groups[i],
  "OtherAmt":this.sampletest[i].otheramount,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count,
  "Voucher_Type": "D",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "DefaultInterest",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  }
  ]
  }
  else{
  this.cashpdata = [
  {
  "Amount": this.sampletest[i].amountpayable,
    "CurrentDue":this.sampletest[i].amountreceived,
    "B_Group":this.B_Groups[i],
  "NPArrear":this.sampletest[i].nonprizedarrear,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count = this.count + 1,
  "Voucher_Type": "C",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "Cash",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": this.sampletest[i].amountpayable,
   "CurrentDue":this.sampletest[i].amountreceived,
   "B_Group":this.B_Groups[i],
  "NPArrear":this.sampletest[i].nonprizedarrear,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count,
  "IsAccepted": "0",
  "Voucher_Type": "D",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "Cash",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
  "Interest":this.sampletest[i].interest,
  "B_Group":this.B_Groups[i],
  "OtherAmt":this.sampletest[i].otheramount,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count = this.count + 1,
  "Voucher_Type": "C",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "DefaultInterest",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  },
  {
  "Amount": +this.sampletest[i].interest + +this.sampletest[i].otheramount,
  "Interest":this.sampletest[i].interest,
  "B_Group":this.B_Groups[i],
  "OtherAmt":this.sampletest[i].otheramount,
  "IsDeleted": 0,
  "MemberID": this.sampletest[i].memberid,
  "ReceievedBy": "admin",
  "Series": "BCAPP",
  "T_Day": format(new Date(this.nedate), "dd"),
  "T_Month": format(new Date(this.nedate), "MM"),
  "T_Year": format(new Date(this.nedate), "yyyy"),
  "Trans_Medium": "0",
  "Trans_Type": "1",
  "TransactionKey": 0,
  "Voucher_No": this.count,
  "Voucher_Type": "D",
  "IsAccepted": "0",
  "AppReceiptno": this.receipt_name,
  "ISActive": true,
  "BranchID": this.sampletest[i].branchid,
  "ChitGroupId": this.sampletest[i].chitgroupid,
  // "Narration": this.sampletest[i].narration,
  "Head_Id": this.sampletest[i].headid,
  "Other_Trans_Type": 1,
  "RootID": this.sampletest[i].rootid,
  "M_Id": this.sampletest[i].m_id,
  "Type": "DefaultInterest",
  "MoneyCollId":this.post_id,
  "VoucherCount":this.newvoucher_count,
  "VoucherCode":this.Receipt_code
  }
  ]
  
  }
  console.log(this.cashpdata)
  this.cashdata.push(this.cashpdata);
  this.cashdata1 = [].concat.apply([], this.cashdata);
  for (let i = this.cashdata1.length - 1; i >= 0; --i) {
  if (this.cashdata1[i].Amount == "0") {
  this.cashdata1.splice(i, 1);
  }
  }
  }
  if(this.cashdata1){
    this.cashfunction(this.cashdata1)
  }
 
  }
  else {
  // alert('error');
  // loading.dismiss();
  this.dismiss();
  }
  } ,(error:HttpErrorResponse)=>{
    if(error.status ===401){    
      this.dismiss();
      this.presentToast("Session timeout, please login to continue.");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
     }
     else if(error.status ===400){   
    this.dismiss();
      this.presentToast("Server Error! Please try login again.");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
   }else{
    this.dismiss();
    this.presentToast("Server Error! Please try login again.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
   }
  })
  }
 


  },(error:HttpErrorResponse)=>{
    if(error.status ===401){    
      this.dismiss();
      this.presentToast("Session timeout, please login to continue.");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
     }
     else if(error.status ===400){   
    this.dismiss();
      this.presentToast("Server Error! Please try login again.");
      this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
      })
      this.router.navigate(["/login"]);
   }else{
    this.dismiss();
    this.presentToast("Server Error! Please try login again.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
   }
  })

}

cashfunction(data:any){
  this.paymentservice.post_vouchercash(data,localStorage.getItem("tokens")).subscribe((res:Observable<any>) => {
    if(res){
      this.voucher_res = res;
      this.dismiss();
      this.presentToast('sucessfully updated');
       let navigationExtras: NavigationExtras = {
        queryParams: { state:JSON.stringify(this.voucher_res )},
        // skipLocationChange: true
        };
        console.log(this.voucher_res)
        this.router.navigate(['/cashprint'],navigationExtras)
    }
},(error:HttpErrorResponse)=>{
  if(error.status ===401){    
    this.dismiss();
    this.presentToast("Session timeout, please login to continue.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
   }
   else if(error.status ===400){   
  this.dismiss();
    this.presentToast("Server Error! Please try login again.");
    this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
    })
    this.router.navigate(["/login"]);
 }else{
  this.dismiss();
  this.presentToast("Server Error! Please try login again.");
  this.dashboardservice.logout(localStorage.getItem("col_id")).subscribe(res=>{
  })
  this.router.navigate(["/login"]);
 }
})
}

  logout() {
  this.router.navigateByUrl('login');
  localStorage.clear();
  }
  async present() {
  this.isLoading = true;
  return await this.loadingController.create({
  message: 'Saving data, Please wait.....'
  }).then(a => {
  a.present().then(() => {
  if (!this.isLoading) {
  a.dismiss().then(() => console.log('abort presenting'));
  }
  });
  });
  }
  async dismiss() {
  this.isLoading = false;
  return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  padLeadingZeros(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
  }
  async presentToast(message) {
  this.toast.show(message, '2000', 'bottom').subscribe(
  toast => {
  console.log(toast);
  });
  }
  async presentToast1(message) {
    this.toast.show(message, '3000', 'bottom').subscribe(
    toast => {
    console.log(toast);
    });
    }

    indianRupeeFormat(val: number) {
      return Number(val).toLocaleString('en-IN');
    }
  }