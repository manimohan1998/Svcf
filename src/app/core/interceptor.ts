import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private router:Router) {
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         let app=localStorage.getItem("app")
         console.log(this.router.url)
 if(app=="customer"){
    if (!/^(http|https):/i.test(request.url)) {
        console.log(request.url)
                  if (request.url.includes('login')) {
                      console.log(request.url)
                      request = request.clone({ url: "https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/" + request.url });
                  }
                  else {
                      const headers: HttpHeaders = new HttpHeaders({
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                          // Accept: localStorage.getItem('schema')
                      });
                      request = request.clone({ url: "https://api.sreevisalam.com/SVCF_WCF/api/SVCFAPI/" + request.url, headers });
                  }
       
            
              }
            return next.handle(request);
}
else{
    if (!/^(http|https):/i.test(request.url)) {
        console.log(request.url)
                  if (request.url.includes('login')) {
                      console.log(request.url)
                      request = request.clone({ url: "https://emp.sreevisalam.com/SVCF_Service/Service1.svc/" + request.url });
                  }
                  else {
                      const headers: HttpHeaders = new HttpHeaders({
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${localStorage.getItem("tokens")}`,
                          // Accept: localStorage.getItem('schema')
                      });
                      request = request.clone({ url: "https://emp.sreevisalam.com/SVCF_Service/Service1.svc/" + request.url, headers });
                  }
       
            
              }
            return next.handle(request);
}
       
          }
    }
