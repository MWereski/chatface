import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

 //intercept(req, next){
 //  let authService = this.injector.get(AuthService);
 //  let tokenizedReq = req.clone({
 //    setHeader: {
 //      Authorization: `Bearer ${authService.getToken()}`
 //    }
 //  })
 //  return next.handle(tokenizedReq);
 //}

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let _authService = this.injector.get(AuthService);
  const token: string = localStorage.getItem('token');

  if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  }

  if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
  }

  request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

  return next.handle(request);
}
}
