import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BezahlenComponent } from './bezahlen/bezahlen.component';
import { BenutzerComponent } from './benutzer/benutzer.component';
import { KaufAbgeschlossenComponent } from './kauf-abgeschlossen/kauf-abgeschlossen.component';
import { LoginComponent } from './login/login.component';
import { ProduktDetailComponent } from './produkt-detail/produkt-detail.component';
import { ProduktlisteComponent } from './produktliste/produktliste.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { VerwaltungComponent } from './verwaltung/verwaltung.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';
import { BenutzerGuardService as BenutzerGuard } from './benutzer-guard.service';
import { BenutzerVerwaltungComponent } from './verwaltung/benutzer-verwaltung/benutzer-verwaltung.component';
import { BestellungenVerwaltungComponent } from './verwaltung/bestellungen-verwaltung/bestellungen-verwaltung.component';
import { ProduktVerwaltungComponent } from './verwaltung/produkt-verwaltung/produkt-verwaltung.component';
import { LagerVerwaltungComponent } from './verwaltung/lager-verwaltung/lager-verwaltung.component';
import { AbrechnungVerwaltungComponent } from './verwaltung/abrechnung-verwaltung/abrechnung-verwaltung.component';


const routes: Routes = [
  { path: '', redirectTo: '/uebersicht', pathMatch: 'full' },
  { path: 'bezahlen/:zahlungsart', component: BezahlenComponent },
  { path: 'benutzer', component: BenutzerComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'user'}},
  { path: 'kauf-abgeschlossen', component: KaufAbgeschlossenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produkte/:id', component: ProduktDetailComponent },
  { path: 'produkte', component: ProduktlisteComponent },
  { path: 'uebersicht', component: UebersichtComponent },
  { path: 'verwaltung', component: VerwaltungComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'admin'} },
  { path: 'verwaltung/produkt-verwaltung', component: ProduktVerwaltungComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'admin'} },
  { path: 'verwaltung/benutzer-verwaltung', component: BenutzerVerwaltungComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'admin'} },
  { path: 'verwaltung/bestellungen-verwaltung', component: BestellungenVerwaltungComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'admin'} },
  { path: 'verwaltung/lager-verwaltung', component: LagerVerwaltungComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'admin'} },
  { path: 'verwaltung/abrechnung-verwaltung', component: AbrechnungVerwaltungComponent, canActivate: [BenutzerGuard], data: { 'erwarteteRolle' : 'admin'} },
  { path: 'warenkorb', component: WarenkorbComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
