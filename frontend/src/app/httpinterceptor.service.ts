import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"

import { LadeIndikatorService } from './lade-indikator.service';
import { AuthService } from './auth.service';

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"
import 'rxjs/add/operator/do';
import { catchError, finalize, map } from 'rxjs/operators';


@Injectable()
export class Httpinterceptor implements HttpInterceptor {

  private erlaubteErrorCodes = [400, 401, 406];

  constructor(
    private ladeIndikatorService: LadeIndikatorService,
    private authService: AuthService
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Start showing the loading bar
    this.ladeIndikatorService.startLaden();

    // Add JWT if set
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.tokenBeziehen()}`
      }
    });

    return next.handle(request).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        if (!this.erlaubteErrorCodes.includes(error.status))
        {
          this.ladeIndikatorService.fehlermeldungHinzufuegen(error);
          console.log(error);
        }
        return Observable.throw(error);
      }),
      finalize(() => {
        this.ladeIndikatorService.stoppLaden();
      })
    )
  }
}
