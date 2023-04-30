import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorDialog: ErrorDialogComponent) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = `Error ${error.status}: ${error.statusText}`;
        alert(errorMessage)
        // this.errorDialog.errorMessage = errorMessage;
        // console.log("this.errorDialog.errorMessage => ", this.errorDialog.errorMessage)
        // if (errorMessage) this.errorDialog.show();
        return throwError(() => error);
      })
    );
  }
}
