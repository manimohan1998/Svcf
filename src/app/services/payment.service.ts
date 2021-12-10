import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  // https://emp.sreevisalam.com/SVCF_Service/Service1.svc/VoucherCreditDebit/AddList?token=
  payment_details(m_id,token){
    return this.http.get('chitdetails/Mid?Mid='+m_id+'&Token='+token);
}
cash_details(branch,token){
  return this.http.post('ReceiptTable/AddList?token='+token,branch)
}
post_vouchercash(cashvoucher,token):Observable<any>{
  return this.http.post('VoucherCreditDebit/AddList?token='+token,cashvoucher)

}
post_defaultvouchercash(defaultvoucher,token){
  return this.http.post('DefaultCreditDebit/AddList?token='+token,defaultvoucher)

}
receipt_update(return_value,token){
  return this.http.post('ReceiptTable/Update?token='+token,return_value)

}

print_details(print_id,token){
  return this.http.get('AppVoucherPrint/AppReceiptno?AppReceiptno='+print_id+'&Token='+token)

}
receiptseries(series,id,token){
	return this.http.get('ReceiptNo/Series?Series='+series+'&moneycollid='+id+'&Token='+token)
}
receiptseries1(series,collid,token){
	return this.http.get('AppVoucherCode/Series?Series='+series+'&moneycollid='+collid+'&Token='+token)
  // https://emp.sreevisalam.com/SVCF_Service/Service1.svc/AppVoucherCode/Series?Series=BCAPP&moneycollid=33&token=e
}
receipthistory(mid,fromdate,todate,token): Observable<any>{
  return this.http.get('VoucherHistory/Mid?Mid='+mid +'&&FromDate='+fromdate+'&&ToDate='+todate+'&Token='+token)
}
toddayamount(id,token){
  return this.http.get('TotalPaidToday/MemberId?MemberId='+id+'&token='+token)
}
getProfileImg(id,token){
  return this.http.get('GetProfileImage/MemberIdNew?MemberIdNew='+id+'&token='+token)
}
}
