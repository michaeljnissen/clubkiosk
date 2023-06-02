import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LagerVerwaltungComponent } from './lager-verwaltung.component';

describe('LagerVerwaltungComponent', () => {
  let component: LagerVerwaltungComponent;
  let fixture: ComponentFixture<LagerVerwaltungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LagerVerwaltungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LagerVerwaltungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
