import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrammarService } from '../../../services/grammar/grammar.service';
import { IAnswerForDb, IExercise } from '../../../models/exercise';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user/user.service';
import { AnswerGrammarService } from '../../../services/answer-grammar/answer-grammar.service';

@Component({
  selector: 'app-grammar-item',
  templateUrl: './grammar-item.component.html',
  styleUrl: './grammar-item.component.scss',
})
export class GrammarItemComponent {
  exercise: IExercise;
  idNumber: number[];
  exerciseForm: FormGroup;
  user: IUser;
  answerForDB: IAnswerForDb;
  checkedAnswers: IAnswerForDb;
  isCorrect: (boolean | undefined)[];
  showAnswers: boolean = false;
  showNote: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private grammarService: GrammarService,
    private userService: UserService,
    private answerGrammarService: AnswerGrammarService
  ) {}

  ngOnInit() {
    // params
    const routerIdParam = this.route.snapshot.paramMap.get('id') as string; // for route
    const querryIdParam = this.route.snapshot.queryParamMap.get('id') as string; // for queryParams
    const paramValueId = routerIdParam || querryIdParam;

    if (paramValueId) {
      this.getExercise(paramValueId);
    }
  }

  getExercise(id: string) {
    this.grammarService.getGrammarByIdWOAnswers(id).subscribe((data) => {
      this.exercise = data;
      this.idNumber = data.text.map((el) => el.id);
      this.exerciseForm = this.createFormGroup(this.idNumber);
    });
  }

  createFormGroup(questionsNumber: number[]): FormGroup {
    let group: any = {};
    questionsNumber.forEach((question: number, index: number) => {
      group[question] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  onSubmit() {
    this.answerForDB = {
      userId: '',
      exerciseId: '',
      type: '',
      title: '',
      difficulty: 0,
      realAnswers: [],
      text: [],
      studentAnswers: [],
    };

    const rawAnswer = this.exerciseForm.getRawValue();
    // console.log('RAW answer', rawAnswer);

    for (const [key, value] of Object.entries(rawAnswer)) {
      // console.log(`${key}, ${value}`);
      this.answerForDB.studentAnswers.push({
        id: Number(key),
        answer: value as string,
      });
    }

    // console.log('formattedAnswer', this.answerForDB);

    this.user = this.userService.getUser();
    // console.log('USER', this.user);
    this.answerForDB.userId = this.user._id as string;
    this.answerForDB.exerciseId = this.exercise._id as string;
    this.answerForDB.type = this.exercise.type;
    this.answerForDB.title = this.exercise.title;
    this.answerForDB.difficulty = this.exercise.difficulty;
    this.answerForDB.text = this.exercise.text;

    // console.log('answerForDB', this.answerForDB)

    this.answerGrammarService
      .checkAndPostAnswer(this.answerForDB)
      .subscribe((data) => {
        console.log('CHECK AND POST ANSWER', data);
        this.checkedAnswers = data;
        console.log(this.checkedAnswers);
        console.log('STUDENT ANSWEWRS', this.checkedAnswers.studentAnswers);

        // this.isCorrect = this.checkedAnswers.studentAnswers.map(el => el.isCorrect)
        // console.log(this.isCorrect)

        this.isCorrect = this.checkedAnswers.studentAnswers.map(
          (el) => el.isCorrect
        );
      });

    this.showAnswers = true;

    this.showNoteFn()
  }

  showNoteFn() {
    this.showNote = true; 
    setTimeout(() => {
      this.showNote = false;
    }, 6000)
  }
}
