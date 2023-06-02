import { TestBed, inject } from '@angular/core/testing';

import { BenutzerService } from './benutzer.service';

describe('BenutzerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenutzerService]
    });
  });

  it('should be created', inject([BenutzerService], (service: BenutzerService) => {
    expect(service).toBeTruthy();
  }));
});
