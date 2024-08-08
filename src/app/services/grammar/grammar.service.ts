import { Injectable } from '@angular/core';
import { GrammarRestService } from '../rest/grammar/grammar-rest.service';
import { Observable } from 'rxjs';
import { IExercise } from '../../models/exercise';

@Injectable({
  providedIn: 'root',
})
export class GrammarService {
  constructor(private grammarRestService: GrammarRestService) {}


  getAllGrammarForAdmin(): Observable<IExercise[]> {
    return this.grammarRestService.getAllGrammarForAdmin();
  }

  getAllGrammar(): Observable<IExercise[]> {
    return this.grammarRestService.getAllGrammar();
  }

  postOneGrammar(data: IExercise): Observable<IExercise> {
    return this.grammarRestService.postOneGrammar(data);
  }

  getGrammarById(id: string): Observable<IExercise> {
    return this.grammarRestService.getGrammarById(id);
  }

  getGrammarByIdWOAnswers(id: string): Observable<IExercise> {
    return this.grammarRestService.getGrammarByIdWOAnswers(id);
  }

  getGrammarByName(prompt: string): Observable<IExercise[]> {
    return this.grammarRestService.getGrammarByName(prompt);
  }

  deleteExerciseById(id: string): Observable<IExercise> {
    return this.grammarRestService.deleteGrammarById(id);
  } 
}
