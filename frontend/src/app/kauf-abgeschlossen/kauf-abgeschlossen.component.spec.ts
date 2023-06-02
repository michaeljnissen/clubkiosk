import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KaufAbgeschlossenComponent } from './kauf-abgeschlossen.component';

describe('KaufAbgeschlossenComponent', () => {
  let component: KaufAbgeschlossenComponent;
  let fixture: ComponentFixture<KaufAbgeschlossenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KaufAbgeschlossenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KaufAbgeschlossenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
