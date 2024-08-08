import { Injectable } from '@angular/core';
import { AnswerGrammarRestService } from '../rest/answer-grammar/answer-grammar.service';
import { Observable } from 'rxjs';
import { IAnswerForDb } from '../../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class AnswerGrammarService {
  constructor(private answerrGrammarRestService: AnswerGrammarRestService) {}

  getAllAnswer(): Observable<IAnswerForDb[]> {
    return this.answerrGrammarRestService.getAllAnswers();
  }

  getAnswerById(id: string): Observable<IAnswerForDb> {
    return this.answerrGrammarRestService.getAnswerById(id);
  }

  checkAndPostAnswer(data: IAnswerForDb): Observable<IAnswerForDb> {
    return this.answerrGrammarRestService.checkAndPostAnswer(data);
  }

  getAnswerForAdminByUser(id: string): Observable<IAnswerForDb[]> {
    return this.answerrGrammarRestService.getAnswersForAdminByUser(id);
  }

  getAnswersByUser(id: string): Observable<IAnswerForDb[]> {
    return this.answerrGrammarRestService.getAnswersByUser(id);
  }
}
