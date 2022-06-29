import { TestBed } from '@angular/core/testing';

import { GlobalPriceRangeService } from './global-price-range.service';

describe('GlobalPriceRangeService', () => {
  let service: GlobalPriceRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalPriceRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
