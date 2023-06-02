import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrechnungVerwaltungComponent } from './abrechnung-verwaltung.component';

describe('AbrechnungVerwaltungComponent', () => {
  let component: AbrechnungVerwaltungComponent;
  let fixture: ComponentFixture<AbrechnungVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrechnungVerwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrechnungVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
