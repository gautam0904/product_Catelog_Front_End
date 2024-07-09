import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BaseURLInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const baseurl = 'http://localhost:3030'

    const router = inject(Router)

    const accesstoken = localStorage.getItem('token');

    const modifiedRequest = request.clone({
      url: baseurl + request.url,
      setHeaders: {
        token : `Bearer ${accesstoken}`
      }
    });
    
    return next.handle(modifiedRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          router.navigate(['/auth/login'])
        }
        return throwError(() => err);
      })
    );
  }
}
