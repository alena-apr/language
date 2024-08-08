import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnswerForDb } from '../../../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class AnswerGrammarRestService {
  constructor(private http: HttpClient) {}

  getAllAnswers(): Observable<IAnswerForDb[]> {
    return this.http.get<IAnswerForDb[]>(
      'http://localhost:3000/answer-grammar'
    );
  }

  getAnswerById(id: string): Observable<IAnswerForDb> {
    return this.http.get<IAnswerForDb>(
      `http://localhost:3000/answer-grammar/${id}`
    );
  }

  checkAndPostAnswer(data: IAnswerForDb): Observable<IAnswerForDb> {
    return this.http.post<IAnswerForDb>(
      'http://localhost:3000/answer-grammar',
      data
    );
  }

  getAnswersForAdminByUser(id: string): Observable<IAnswerForDb[]> {
    return this.http.get<IAnswerForDb[]>(
      `http://localhost:3000/answer-grammar/answers-for-admin/${id}`
    );
  }

  getAnswersByUser(id: string): Observable<IAnswerForDb[]> {
    return this.http.get<IAnswerForDb[]>(
      `http://localhost:3000/answer-grammar/answers-by-user/${id}`
    );
  }
}
