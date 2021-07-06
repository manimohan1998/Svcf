import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) { }

loginCredentials(name,password){
    return this.http.get(environment.url+'login?userName='+name+'&&password='+password)
}

requestOtp(otp_request){
  return this.http.get(environment.url+'ForgotPassword?userName='+otp_request)
}

otpVerification(otp){
  return this.http.get(environment.url+'set backend endpoint?optvalue='+otp)
}

resetPassword(username,password){
  return this.http.get(environment.url+'PasswordSet?password='+password+' &userName='+username)
}
sameUsername(user){
  return this.http.get(environment.url+'GetUserName?userName='+user)
}
sameMobileNumber(member1){
  return this.http.get(environment.url+'GetPassword?MemberIDNew='+member1)
}
reset(id,name,password,dob){
  return this.http.get(environment.url+'RestPassword?MemberIDNew='+id+"&&userName="+name+'&&Password='+password+'&&DOB='+dob)
}
// personalDetails(memidnew){
//   return this.http.get(environment.url+'UserDetails?MemberIDNew='+memidnew)
// }
}

