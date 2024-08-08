import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercise } from '../../../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class GrammarRestService {
  constructor(private http: HttpClient) {}

  getAllGrammarForAdmin(): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(
      'http://localhost:3000/grammar'
    );
  }

  getAllGrammar(): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(
      'http://localhost:3000/grammar/exercises'
    );
  }

  postOneGrammar(data: IExercise): Observable<IExercise> {
    return this.http.post<IExercise>('http://localhost:3000/grammar', data);
  }

  getGrammarById(id: string): Observable<IExercise> {
    return this.http.get<IExercise>(`http://localhost:3000/grammar/${id}`);
  }

  getGrammarByIdWOAnswers(id: string): Observable<IExercise> {
    return this.http.get<IExercise>(
      `http://localhost:3000/grammar/exercise/${id}`
    );
  }

  getGrammarByName(prompt: string): Observable<IExercise[]> {
    return this.http.get<IExercise[]>(
      `http://localhost:3000/grammar/${prompt}`
    );
  }

  deleteGrammarById(id: string): Observable<IExercise> {
    return this.http.delete<IExercise>(`hhtp://localhost:3000/grammar/${id}`);
  }
}
