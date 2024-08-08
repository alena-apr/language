import { TestBed } from '@angular/core/testing';

import { GrammarRestService } from './grammar-rest.service';

describe('GrammarRestService', () => {
  let service: GrammarRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrammarRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
