import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BezahlenComponent } from './bezahlen.component';

describe('BezahlenComponent', () => {
  let component: BezahlenComponent;
  let fixture: ComponentFixture<BezahlenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BezahlenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BezahlenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
