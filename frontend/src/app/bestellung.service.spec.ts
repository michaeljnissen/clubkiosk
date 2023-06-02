import { TestBed, inject } from '@angular/core/testing';

import { BestellungService } from './bestellung.service';

describe('BestellungService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BestellungService]
    });
  });

  it('should be created', inject([BestellungService], (service: BestellungService) => {
    expect(service).toBeTruthy();
  }));
});
