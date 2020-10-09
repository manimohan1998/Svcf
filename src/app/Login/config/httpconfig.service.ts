import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpconfigService {

  constructor() { }
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+localStorage.getItem('token'))
    });

    return next.handle(authReq).pipe(catchError((error: any) => {
		if (error instanceof HttpErrorResponse) {
			  
		}
		return Observable.throw(error);
  }));
  }
  
}
  