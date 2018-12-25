import { TestBed } from '@angular/core/testing';

import { EgwkReadService } from './egwk-read.service';

describe('EgwkReadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EgwkReadService = TestBed.get(EgwkReadService);
    expect(service).toBeTruthy();
  });
});
