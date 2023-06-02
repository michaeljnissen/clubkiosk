import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { FehlerService } from '../fehler.service';
import { Globals } from '../globals.service';
import { BenutzerService } from '../benutzer.service';


import { Benutzer } from '../Benutzer';
import { Bestellung } from '../Bestellung';
import { Router } from "@angular/router";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-benutzer',
  templateUrl: './benutzer.component.html',
  styleUrls: ['./benutzer.component.css']
})
export class BenutzerComponent implements OnInit {

  public benutzer: Benutzer;
  public bestellungen: Bestellung[];
  private benutzerPasswortBestaetigen: string;
  public anzeigeModus: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private fehlerService: FehlerService,
    public globals: Globals,
    private router: Router,
    private benutzerService: BenutzerService
  ) { }

  ngOnInit() {
    this.bezieheBenutzer();
    this.bezieheBestellungen();
  }

  public logout(): void {
    this.authService.tokenLoeschen();
    this.router.navigate(['']);
  }

  private bezieheBenutzer(): void {
    let uid = this.authService.userIdBeziehen();

    this.http.get<Benutzer>(Globals.API_URL + "/api/users/" + uid, httpOptions)
      .map((result) => this.benutzer = result)
      .subscribe((res) => console.log(res));
  }

  private bezieheBestellungen(): void {
    this.http.get<Bestellung[]>(Globals.API_URL + "/api/orders", httpOptions)
      .map((result) => this.bestellungen = result)
      .subscribe((res) => console.log(res));
  }

  public benutzerAenderungSpeichern(benutzer: Benutzer): void {

    if(this.benutzerPasswortBestaetigen != benutzer.password)
    {
      this.fehlerService.fehlermeldungHinzufuegen("Passwörter stimmen nicht überein.");
    }

    this.benutzerService.speichereBenutzer(this.benutzer).subscribe(benutzer => {
      this.benutzer = benutzer;
      this.bezieheBenutzer();
    });

  }

}
