import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubscriberApiService {

  constructor(private http: HttpClient) { }

  subscriberList(sub_id){
    return this.http.get(environment.url+'ChitDetails?MemberIDNew=1&&branchId='+sub_id)
  }

  makepayment(payment_detail){
    return this.http.post(environment.url+'set backend endpoint',payment_detail)
  }

  ReceiveRecipt(sub_id){
    return this.http.get(environment.url+'set backend endpoint?optvalue='+sub_id)
  }
  personalDetails(){
    return this.http.get(environment.url+'UserDetails?MemberIDNew=1')
  }
  
}
