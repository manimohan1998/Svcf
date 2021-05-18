import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscriberApiService {

  constructor(private http: HttpClient) { }

  subscriberList(mem_id,sub_id,token){
    return this.http.get('ChitDetails?MemberIDNew='+mem_id+'&&branchId='+sub_id+'&Token='+token)
  }
  makepayment(payment_detail,token){
    return this.http.post('MobilePayment/?token='+token,payment_detail)
  }
  personalDetails(memidnew,token){
    return this.http.get('UserDetails?MemberIDNew='+memidnew+'&Token='+token)
  }
  voucherCount(count,token){
    return this.http.get('GetReceiptNo?series='+count+'&Token='+token)
  }
  receipt(id,token){
    return this.http.get('ReceiptPrint?appReceiptno='+id+'&series=CPAPP'+'&Token='+token)
  }
  receipthistory(start,end,customerid,token){
    return this.http.get('ReceiptsHistory?memberId='+customerid+'&from='+start+'&to='+end+'&series=CPAPP'+'&Token='+token)
  }
  toddayamount(id,token){
    return this.http.get("TotalPaidToday?memberid="+id+"&series=CPAPP&token="+token)
  }
  Vouchercode(token){
    return this.http.get('GetVoucherCode?series=CPAPP&token='+token)
  }
  duplicantpaymentdetails(token){
    return this.http.get('BalanceExpiration?token='+token)
  }
}
