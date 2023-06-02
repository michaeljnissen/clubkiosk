import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { of } from 'rxjs/observable/of';

@Injectable()
export class LadeIndikatorService {

  private ladestatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private fehlermeldungen: String[] = [];

  constructor() { 
  }

  public startLaden(): void
  {

    this.ladestatus.next(this.ladestatus.getValue() + 1);
  }
  
  public stoppLaden(): void 
  {
    this.ladestatus.next(this.ladestatus.getValue() - 1);
  }

  public fehlermeldungHinzufuegen(s: String): void 
  {
    this.fehlermeldungen.push(s);
    console.log(this.fehlermeldungen);
  }

  public fehlerLeeren(): void 
  {
    // array leeren - ueber = [] funktioneirt nicht, da changes nicht observed werden
    this.fehlermeldungen.length = 0;
  }

  public ladeIndikatorGeben(): BehaviorSubject<number>
  {
    return this.ladestatus;
  }

  public fehlermeldungenGeben(): Observable<String[]>
  {
    return of(this.fehlermeldungen);
  }

}
