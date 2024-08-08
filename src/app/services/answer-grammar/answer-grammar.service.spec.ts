import { TestBed } from '@angular/core/testing';

import { AnswerGrammarService } from './answer-grammar.service';

describe('AnswerGrammarService', () => {
  let service: AnswerGrammarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerGrammarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
