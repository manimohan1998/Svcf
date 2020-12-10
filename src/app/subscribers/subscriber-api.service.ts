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

  ReceiveRecipt(sub_id){
    return this.http.get(environment.url+'set backend endpoint?optvalue='+sub_id)
  }
  personalDetails(memidnew){
    return this.http.get(environment.url+'UserDetails?MemberIDNew='+memidnew)
  }
  voucherCount(count){
    return this.http.get(environment.url+'GetReceiptNo?series='+count)
  }
  
}
