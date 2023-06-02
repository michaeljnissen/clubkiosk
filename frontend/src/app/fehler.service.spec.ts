import { TestBed, inject } from '@angular/core/testing';

import { FehlerService } from './fehler.service';

describe('FehlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FehlerService]
    });
  });

  it('should be created', inject([FehlerService], (service: FehlerService) => {
    expect(service).toBeTruthy();
  }));
});
