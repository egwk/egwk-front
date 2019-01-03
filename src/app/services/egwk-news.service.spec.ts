import { TestBed, inject } from '@angular/core/testing';

import { EgwkNewsService } from './egwk-news.service';

describe('EgwkNewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgwkNewsService]
    });
  });

  it('should be created', inject([EgwkNewsService], (service: EgwkNewsService) => {
    expect(service).toBeTruthy();
  }));
});
