import { TestBed } from '@angular/core/testing';

import { UrerRestService } from './urer-rest.service';

describe('UrerRestService', () => {
  let service: UrerRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrerRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
