import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FehlerService } from '../../fehler.service';
import { Globals } from '../../globals.service';


@Component({
  selector: 'app-abrechnung-verwaltung',
  templateUrl: './abrechnung-verwaltung.component.html',
  styleUrls: ['./abrechnung-verwaltung.component.css']
})
export class AbrechnungVerwaltungComponent implements OnInit {

  vereinsfliegerAbrechnungsInformationen: Array<1>;
  buchungstext: String;
  steuersatz: Number;
  stepThreeState: String;

  constructor(
    private http: HttpClient,
    private fehlerService: FehlerService,
    public globals: Globals,
  ) { }

  ngOnInit() {
    this.vereinsfliegerAbrechnungsInformationen = [];
    this.buchungstext = "Abrechnung Getränkekasse";
    this.steuersatz = 19;
    this.stepThreeState = "idle";
  }

  abrechnungStarten(): void {

    this.http.get<Blob>(Globals.API_URL + "/api/accounting/paymentRun").subscribe(
      res => {
        let element = document.createElement('a');
        let blob = new Blob([res], {type: "text/csv;charset=utf-8;"})
        let url = URL.createObjectURL(blob);
        element.href = url;
        element.setAttribute('download', 'abrechnung.csv');
        element.click();
      },
      error => {
        this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
      }
    );

  }

  csvBezieheVereinsfliegerDatenFuerAbrechnungUpload(event) {
    let file = event.target.files[0];
    let formData = new FormData();

    formData.append('csv', file);

    this.http.post<Array<1>>(Globals.API_URL + "/api/accounting/getVereinsfliegerUsersAccountingInfoByCSV", formData).subscribe(
      res => {
        this.vereinsfliegerAbrechnungsInformationen = res;
      },
      error => {
        this.fehlerService.fehlermeldungHinzufuegen(error.error.message);
      }
    );
  }

  async massenVerbuchungStarten() {
    let idx = 0;
    const self = this;
    this.stepThreeState = "processing";
    for (const abrechnungsElement of this.vereinsfliegerAbrechnungsInformationen) {
      if (self.vereinsfliegerAbrechnungsInformationen[idx]["accounting_type"] == "VF") {
        await this.http.post<any>(Globals.API_URL + "/api/accounting/addVereinsfliegerAccountingTransaction", {
          value: self.vereinsfliegerAbrechnungsInformationen[idx]["balance"],
          tax: this.steuersatz,
          debitAccount: self.vereinsfliegerAbrechnungsInformationen[idx]["account_no"],
          creditAccount: "c-8920",
          taxAccount: "1776",
          bookingText: this.buchungstext
          // Add daten
        }).toPromise().then(
          res => {
            self.vereinsfliegerAbrechnungsInformationen[idx]["status"] = "OK";
          },
          error => {
            console.log(idx);
            self.vereinsfliegerAbrechnungsInformationen[idx]["status"] = error.error.message;
          }
        );
      }

      idx += 1;
    }

    this.stepThreeState = "finished";
  }

  async verbucheAbrechnungsInformationen(idx) {
    
  }





}
