import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FehlerService {

  private fehlermeldungen: String[] = [];

  constructor() { }

  public fehlermeldungHinzufuegen(s: String): void
  {
    this.fehlermeldungen.push(s);
  }

  public fehlerLeeren(): void
  {
    // array leeren - ueber = [] funktioneirt nicht, da changes nicht observed werden
    this.fehlermeldungen.length = 0;
  }

  public fehlermeldungenGeben(): Observable<String[]>
  {
    return of(this.fehlermeldungen);
  }


}
