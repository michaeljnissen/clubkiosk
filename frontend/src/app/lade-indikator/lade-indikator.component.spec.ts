import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LadeIndikatorComponent } from './lade-indikator.component';

describe('LadeIndikatorComponent', () => {
  let component: LadeIndikatorComponent;
  let fixture: ComponentFixture<LadeIndikatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LadeIndikatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LadeIndikatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
