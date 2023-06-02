import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

  waehrung: String = "€";

  // Specify your backend URL here
  public static API_URL = 'http://127.0.0.1:8000';

  constructor() { }

}
