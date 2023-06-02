import { TestBed, inject } from '@angular/core/testing';

import { ProduktService } from './produkt.service';

describe('ProduktService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduktService]
    });
  });

  it('should be created', inject([ProduktService], (service: ProduktService) => {
    expect(service).toBeTruthy();
  }));
});
