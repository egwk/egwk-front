import { TestBed, inject } from '@angular/core/testing';

import { EgwkSsqService } from './egwk-ssq.service';

describe('EgwkSsqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgwkSsqService]
    });
  });

  it('should be created', inject([EgwkSsqService], (service: EgwkSsqService) => {
    expect(service).toBeTruthy();
  }));
});
