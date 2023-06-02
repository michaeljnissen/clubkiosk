import { TestBed, inject } from '@angular/core/testing';

import { BenutzerGuardService } from './benutzer-guard.service';

describe('BenutzerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenutzerGuardService]
    });
  });

  it('should be created', inject([BenutzerGuardService], (service: BenutzerGuardService) => {
    expect(service).toBeTruthy();
  }));
});
