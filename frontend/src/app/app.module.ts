import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { BezahlenComponent } from './bezahlen/bezahlen.component';
import { ProduktlisteComponent } from './produktliste/produktliste.component';
import { ProduktDetailComponent } from './produkt-detail/produkt-detail.component';
import { WarenkorbComponent } from './warenkorb/warenkorb.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';
import { KaufAbgeschlossenComponent } from './kauf-abgeschlossen/kauf-abgeschlossen.component';
import { VerwaltungComponent } from './verwaltung/verwaltung.component';
import { AppRoutingModule } from './/app-routing.module';
import { MenuComponent } from './menu/menu.component';

import { ProduktService } from './produkt.service';
import { InventarService } from './inventar.service';
import { BenutzerService } from './benutzer.service';
import { LadeIndikatorService } from './lade-indikator.service';
import { FehlerService } from './fehler.service';
import { Httpinterceptor } from './httpinterceptor.service';
import { Globals } from './globals.service';
import { BenutzerComponent } from './benutzer/benutzer.component';
import { LoginComponent } from './login/login.component';
import { LadeIndikatorComponent } from './lade-indikator/lade-indikator.component';
import { FehlerAnzeigeComponent } from './fehler-anzeige/fehler-anzeige.component';
import { AuthService } from './auth.service';
import { BenutzerGuardService } from './benutzer-guard.service';
import { BestellungService } from './bestellung.service';
import { BenutzerVerwaltungComponent } from './verwaltung/benutzer-verwaltung/benutzer-verwaltung.component';
import { BestellungenVerwaltungComponent } from './verwaltung/bestellungen-verwaltung/bestellungen-verwaltung.component';
import { ProduktVerwaltungComponent } from './verwaltung/produkt-verwaltung/produkt-verwaltung.component';
import { LagerVerwaltungComponent } from './verwaltung/lager-verwaltung/lager-verwaltung.component';
import { AbrechnungVerwaltungComponent } from './verwaltung/abrechnung-verwaltung/abrechnung-verwaltung.component';

import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { ActiveProductsFilterPipe } from './pipes/active-products-filter.pipe';

import { VirtualKeyboardHelferComponent } from './virtual-keyboard-helfer/virtual-keyboard-helfer.component';



@NgModule({
  declarations: [
    AppComponent,
    ProduktlisteComponent,
    ProduktDetailComponent,
    WarenkorbComponent,
    UebersichtComponent,
    KaufAbgeschlossenComponent,
    VerwaltungComponent,
    MenuComponent,
    BezahlenComponent,
    BenutzerComponent,
    LoginComponent,
    LadeIndikatorComponent,
    FehlerAnzeigeComponent,
    BenutzerVerwaltungComponent,
    BestellungenVerwaltungComponent,
    ProduktVerwaltungComponent,
    LagerVerwaltungComponent,
    SearchFilterPipe,
    ActiveProductsFilterPipe,
    VirtualKeyboardHelferComponent,
    AbrechnungVerwaltungComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ProduktService,
    InventarService,
    BenutzerService,
    Globals,
    LadeIndikatorService,
    FehlerService,
    AuthService,
    BenutzerGuardService,
    BestellungService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: Httpinterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
