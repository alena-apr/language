import { TestBed } from '@angular/core/testing';

import { AnswerGrammarRestService } from './answer-grammar.service';

describe('AnswerGrammarService', () => {
  let service: AnswerGrammarRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerGrammarRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
