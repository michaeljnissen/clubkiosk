import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FehlerAnzeigeComponent } from './fehler-anzeige.component';

describe('FehlerAnzeigeComponent', () => {
  let component: FehlerAnzeigeComponent;
  let fixture: ComponentFixture<FehlerAnzeigeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FehlerAnzeigeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FehlerAnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
