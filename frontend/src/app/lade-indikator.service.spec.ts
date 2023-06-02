import { TestBed, inject } from '@angular/core/testing';

import { LadeIndikatorService } from './lade-indikator.service';

describe('LadeIndikatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LadeIndikatorService]
    });
  });

  it('should be created', inject([LadeIndikatorService], (service: LadeIndikatorService) => {
    expect(service).toBeTruthy();
  }));
});
