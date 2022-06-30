import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../authentification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  
  constructor(
    private auth: AuthentificationService
  ) {  }


  intercept(request: HttpRequest<any>,next: HttpHandler) : Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') })
    .clone({setHeaders: {Authorization: `${this.auth.getToken()}`}});
    return next.handle(request);
  }
}