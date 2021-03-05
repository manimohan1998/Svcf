import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscriberApiService {

  constructor(private http: HttpClient) { }

  subscriberList(mem_id,sub_id){
    return this.http.get(environment.url+'ChitDetails?MemberIDNew='+mem_id+'&&branchId='+sub_id)
  }

  makepayment(payment_detail){
    return this.http.post(environment.url+'MobilePayment',payment_detail)
  }
  // makepayment(i,Amount,AppReceiptno,BranchID,ChitGroupId,Head_Id,ISActive,IsAccepted,IsDeleted,M_Id,MemberID,MoneyCollId,Narration,Other_Trans_Type,ReceievedBy,RootID,Series,T_Day,T_Month,T_Year,Trans_Medium,Trans_Type,TransactionKey,Type,Voucher_No,Voucher_Type,PArrear,NPArrear,Interest,VoucherCount){
  //   return this.http.get(environment.url+'MobilePayment?['+i+'].Amount ='+Amount+'&&['+i+'].AppReceiptno ='+AppReceiptno+'&&['+i+'].BranchID ='+BranchID+'&&['+i+'].ChitGroupId ='+ChitGroupId+'&&['+i+'].Head_Id ='+Head_Id+'&&['+i+'].ISActive ='+ISActive+'&&['+i+'].IsAccepted ='+IsAccepted+'&&['+i+'].IsDeleted ='+IsDeleted+'&&['+i+'].M_Id ='+M_Id+'&&['+i+'].MemberID ='+MemberID+'&&['+i+'].MoneyCollId ='+MoneyCollId+'&&['+i+'].Narration ='+Narration+'&&['+i+'].Other_Trans_Type ='+Other_Trans_Type+'&&['+i+'].ReceievedBy ='+ReceievedBy+'&&['+i+'].RootID ='+RootID+'&&['+i+'].Series ='+Series+'&&['+i+'].T_Day ='+T_Day+'&&['+i+'].T_Month ='+T_Month+'&&['+i+'].T_Year ='+T_Year+'&&['+i+'].Trans_Medium ='+Trans_Medium+'&&['+i+'].Trans_Type ='+Trans_Type+'&&['+i+'].TransactionKey ='+TransactionKey+'&&['+i+'].Type ='+Type+'&&['+i+'].Voucher_No ='+Voucher_No+'&&['+i+'].Voucher_Type ='+Voucher_Type+'&&['+i+'].PArrear='+PArrear+'&&['+i+'].NPArrear='+NPArrear+'&&['+i+'].Interest='+Interest+'&&['+i+'].VoucherCount='+VoucherCount+'')
  // }

  ReceiveRecipt(sub_id){
    return this.http.get(environment.url+'set backend endpoint?optvalue='+sub_id)
  }
  personalDetails(memidnew){
    return this.http.get(environment.url+'UserDetails?MemberIDNew='+memidnew)
  }
  voucherCount(count){
    return this.http.get(environment.url+'GetReceiptNo?series='+count)
  }
  receipt(id){
    return this.http.get(environment.url+'ReceiptPrint?appReceiptno='+id+'&series=CPAPP')
  }
  receipthistory(start,end,customerid){
    return this.http.get(environment.url+'ReceiptsHistory?memberId='+customerid+'&from='+start+'&to='+end+'&series=CPAPP')
  }
}
