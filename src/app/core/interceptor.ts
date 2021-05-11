import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor() {
    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!/^(http|https):/i.test(request.url)) {
            console.log(request.url)
                      if (request.url.includes('login')) {
                          console.log(request.url)
                          request = request.clone({ url: environment.url + request.url });
                      }
                      else {
                          const headers: HttpHeaders = new HttpHeaders({
                              'Content-Type': 'application/json',
                              Authorization: `Bearer ${localStorage.getItem("token")}`,
                              // Accept: localStorage.getItem('schema')
                          });
                          request = request.clone({ url: environment.url + request.url, headers });
                      }
           
                
                  }
                
              
           return next.handle(request);
          }
    }
