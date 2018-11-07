import { TestBed, inject } from '@angular/core/testing';

import { EgwkApiService } from './egwk-api.service';

describe('EgwkApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgwkApiService]
    });
  });

  it('should be created', inject([EgwkApiService], (service: EgwkApiService) => {
    expect(service).toBeTruthy();
  }));
});
