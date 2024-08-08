import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GrammarService } from '../../../services/grammar/grammar.service';
import { IExercise } from '../../../models/exercise';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  exerciseForm: FormGroup;

  payload: any;

  constructor(private fb: FormBuilder, private grammarService: GrammarService) {
    this.exerciseForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      difficulty: ['', Validators.required],
      realAnswers: this.fb.array([]),
    });
  }

  get realAnswers(): FormArray {
    return this.exerciseForm.get('realAnswers') as FormArray;
  }

  newRealAnswers(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      answer: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  addRealAnswers() {
    this.realAnswers.push(this.newRealAnswers());
  }

  removeRealAnswers(i: number) {
    this.realAnswers.removeAt(i);
  }

  showPayload() {
    this.payload = JSON.stringify(this.exerciseForm.getRawValue());
    console.log('PAYLOAD', this.payload)
  }

  sendFormattedForm() {
    const rawValue = this.exerciseForm.getRawValue();

    const realAnswers = rawValue.realAnswers.map(
      (el: { id: string; answer: string; text: string }) => {
        const realAnswerObj = {
          id: parseInt(el.id),
          answer: el.answer,
        };
        return realAnswerObj;
      }
    );

    const text = rawValue.realAnswers.map(
      (el: { id: string; answer: string; text: string }) => {
        const textObj = {
          id: parseInt(el.id),
          text: el.text,
          transformedText: el.text.split('***'),
        };
        return textObj;
      }
    );

    const exerciseForDb: IExercise = {
      type: rawValue.type,
      title: rawValue.title,
      difficulty: parseInt(rawValue.difficulty),
      realAnswers: realAnswers,
      text: text,
      studentAnswers: [],
    };

    console.log('EXERCISE FOR DB',exerciseForDb);

    this.grammarService.postOneGrammar(exerciseForDb).subscribe((data) => {
      console.log(data);
    });
  }
}
