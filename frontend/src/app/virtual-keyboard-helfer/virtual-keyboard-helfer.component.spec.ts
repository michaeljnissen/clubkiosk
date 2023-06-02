import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualKeyboardHelferComponent } from './virtual-keyboard-helfer.component';

describe('VirtualKeyboardHelferComponent', () => {
  let component: VirtualKeyboardHelferComponent;
  let fixture: ComponentFixture<VirtualKeyboardHelferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualKeyboardHelferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualKeyboardHelferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
