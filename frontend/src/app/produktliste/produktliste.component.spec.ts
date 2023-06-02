import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktlisteComponent } from './produktliste.component';

describe('ProduktlisteComponent', () => {
  let component: ProduktlisteComponent;
  let fixture: ComponentFixture<ProduktlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduktlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduktlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
