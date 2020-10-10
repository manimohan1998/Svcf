import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) { }

loginCredentials(credentials){
    return this.http.post(environment.url+'set backend endpoint',credentials)
}

requestOtp(otp_request){
  return this.http.post(environment.url+'set backend endpoint',otp_request)
}

otpVerification(otp){
  return this.http.get(environment.url+'set backend endpoint?optvalue='+otp)
}

resetPassword(data){
  return this.http.post(environment.url+'set backend endpoint',data)

}

}