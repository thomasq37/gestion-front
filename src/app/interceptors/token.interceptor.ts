import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');
    const userToken = localStorage.getItem('userToken');
    if (token && !request.url.includes('/completions')) {
      request = request.clone({
        setHeaders: {
          "X-API-USER-KEY": `${userToken}`,
          "X-API-KEY": `${token}`
        }
      });
    }
    return next.handle(request);
  }
}
