import { Component, OnInit } from '@angular/core';
import { BenutzerService } from '../../benutzer.service';
import { Benutzer } from '../../benutzer';
import { FehlerService } from '../../fehler.service';

@Component({
  selector: 'app-benutzer-verwaltung',
  templateUrl: './benutzer-verwaltung.component.html',
  styleUrls: ['./benutzer-verwaltung.component.css']
})
export class BenutzerVerwaltungComponent implements OnInit {

  public aktuellerBenutzer: Benutzer;
  public benutzerListe: Benutzer[];
  public vfAdminEmail: string;
  public vfAdminPw: string;

  constructor(
    private benutzerService: BenutzerService,
    private fehlerService: FehlerService
  ) { }

  ngOnInit() {
    this.bezieheBenutzer();
  }

  bezieheBenutzer(): void {
    this.benutzerService.bezieheBenutzerListe().subscribe(benutzer => this.benutzerListe = benutzer);
  }

  waehleBenutzer(benutzer: Benutzer): void {
    this.benutzerService.bezieheBenutzer(benutzer).subscribe(aktuellerBenutzer => this.aktuellerBenutzer = aktuellerBenutzer);
  }

  speichereBenutzer(benutzer: Benutzer): void {
    this.benutzerService.speichereBenutzer(benutzer).subscribe(aktuellerBenutzer => {
      this.aktuellerBenutzer = aktuellerBenutzer;
      this.bezieheBenutzer();
      this.aktuellerBenutzer = null;
    });
  }

  synchronisiereBenutzer(benutzer: string, passwort: string): void {
    this.benutzerService.synchronisiereBenutzer(benutzer, passwort).subscribe(rueckmeldung => {
      alert(rueckmeldung);
    }, error => {
      this.fehlerService.fehlermeldungHinzufuegen(error.error);
    });
  }

}
