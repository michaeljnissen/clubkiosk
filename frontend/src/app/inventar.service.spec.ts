import { TestBed, inject } from '@angular/core/testing';

import { InventarService } from './inventar.service';

describe('InventarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventarService]
    });
  });

  it('should be created', inject([InventarService], (service: InventarService) => {
    expect(service).toBeTruthy();
  }));
});
