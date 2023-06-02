import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellungenVerwaltungComponent } from './bestellungen-verwaltung.component';

describe('BestellungenVerwaltungComponent', () => {
  let component: BestellungenVerwaltungComponent;
  let fixture: ComponentFixture<BestellungenVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestellungenVerwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellungenVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
