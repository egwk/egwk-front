import { TestBed, inject } from '@angular/core/testing';

import { EgwkBibleService } from './egwk-bible.service';

describe('EgwkBibleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgwkBibleService]
    });
  });

  it('should be created', inject([EgwkBibleService], (service: EgwkBibleService) => {
    expect(service).toBeTruthy();
  }));
});
