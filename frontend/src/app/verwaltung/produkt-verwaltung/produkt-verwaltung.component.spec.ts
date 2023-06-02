import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktVerwaltungComponent } from './produkt-verwaltung.component';

describe('ProduktVerwaltungComponent', () => {
  let component: ProduktVerwaltungComponent;
  let fixture: ComponentFixture<ProduktVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktVerwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
