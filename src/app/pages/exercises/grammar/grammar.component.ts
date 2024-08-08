import { Component, ElementRef, ViewChild } from '@angular/core';
import { IExercise, IText } from '../../../models/exercise';
import { GrammarService } from '../../../services/grammar/grammar.service';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.component.html',
  styleUrl: './grammar.component.scss',
})
export class GrammarComponent {
  @ViewChild('grammarSearchByTitle') grammarSearchByTitle: ElementRef;
  grammarExs: IExercise[];
  grammarExsCopy: IExercise[];
  phrases: IText[];
  idNumber: number[];
  showAnswers: boolean = false;

  constructor(private grammarService: GrammarService, private router: Router) {}

  ngOnInit(): any {
    console.log('HERE IS THE GRAMMAR');
    this.grammarService.getAllGrammar().subscribe((data) => {
      if (Array.isArray(data)) {
        console.log('EX DATA', data);
        this.grammarExs = data;
        this.grammarExsCopy = [...this.grammarExs];
      }
    });

    this.getEx();

    // this.exForm = this.createFormGroup(this.idNumber);

    // console.log(JSON.stringify(exercise1))
  }

  ngAfterViewInit() {
    fromEvent<KeyboardEvent>(this.grammarSearchByTitle.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        tap((ev) => {
          const targetValue = (ev.target as HTMLInputElement)?.value;
          console.log('TARGET VALUE', targetValue);

          if (targetValue === '' || targetValue.length < 3) {
            this.grammarExs = [...this.grammarExsCopy];
          }
          this.grammarService
            .getGrammarByName(targetValue)
            .subscribe((data) => {
              console.log('SUBSCRIBE DATA', data);
              this.grammarExs = data;
            });
        })
      )
      .subscribe();
  }

  getEx(): void {
    // this.grammarExs = exercise1;
    // console.log('!!!!!!!!!!!!!!!this.grammsrExs', this.grammarExs);
    // const grExFlat = this.grammarExs.flat();
    // console.log('grExFlat', grExFlat);
    // const stAns = grExFlat.map((el) => el.studentAnswer);
    // console.log('stAnsw', stAns);
    // const exText: IText[][] = exercise1.map((el) => el.text);
    // console.log('exText', exText);
    // const exTextFlat = exText.flat();
    // console.log('exTextFlat', exTextFlat);
    // this.phrases = exTextFlat;
    // const exPhrase = exTextFlat.map((el) => el.transformedText);
    // console.log('exPhrase', exPhrase);
    // const exPrasesText = exText.map((el) => el.map((el) => el.text));
    // const exPrasesId = exText.map((el) => el.map((el) => el.id));
    // const flatText = exPrasesText.flat();
    // const flatId = exPrasesId.flat();
    // console.log(flatText);
    // console.log(flatId);
    // console.log(flatId.length);
    // const phrasesToGo = flatText.map((el) => el.split('***'));
    // console.log('PHRASE TO GO FOR DB', phrasesToGo);
    // console.log(phrasesToGo.length);
    // this.phrases = phrasesToGo
    // this.idNumber = flatId;
    //ANSWERS
    // const exAnswers = exercise1.map((el) => el.realAnswer.flat());
    // console.log('exAnswer', exAnswers);
    // const exAnswersFlat = exAnswers.flat();
    // console.log('exAnswersFlat', exAnswersFlat);
    // this.realAnswers = exAnswersFlat;
  }

  // createFormGroup(questionsNumber: number[]): FormGroup {
  //   let group: any = {};
  //   questionsNumber.forEach((question: number, index: number) => {
  //     group[question] = new FormControl('', Validators.required);
  //   });
  //   return new FormGroup(group);
  // }

  transformText() {}

  onSubmit() {
    // console.log(JSON.stringify(this.exForm.getRawValue()))
    // this.newArray.push()
    // console.log('ON SUBMIT');
    // this.payLoad = JSON.stringify(this.exForm.getRawValue());
    // console.log(this.payLoad);
    // const rawAnswer = this.exForm.getRawValue();
    // console.log('RAW answer', rawAnswer);
    // const formatedAnswers = [];
    // for (const [key, value] of Object.entries(rawAnswer)) {
    //   console.log(`${key}, ${value}`);
    //   formatedAnswers.push({
    //     id: Number(key),
    //     answer: value as string,
    //   });
    // }
    // console.log('formatedAnswer', formatedAnswers);
    // const answ: IFormattedAnswers[] = this.checkAnswers(formatedAnswers);
    // console.log('answ', answ);
    // const answObj = {
    //   answ,
    // };
    // this.isCorrectCSS = answ.map(answ => answ.isCorrect ? 'nice' : 'boo')
    // this.grammarExs = Object.assign(this.grammarExs.studentAnswer, answObj)
    // const smth: IExerciseWStudentAnsw[] = this.grammarExs.map((el) => {
    //   answ.forEach((answer) => el.studentAnswer.push(answer));
    // });
    // console.log('SOMETHING', smth);
    // console.log('NEW GRAMM EX', this.grammarExs);
    // this.showAnswers = true;
  }

  // checkAnswers(formatedAnswers: IRawAnswer[]) {
  //   console.log('HERE IS THE CHECK ANSWERS');
  //   const checkedAnswers = formatedAnswers.map((formatedAnswer) => {
  //     let check = this.realAnswers.find(
  //       (answer) => answer.id === formatedAnswer.id
  //     );
  //     if (
  //       formatedAnswer.answer?.toLowerCase() !== check?.answer.toLowerCase()
  //     ) {
  //       return { ...formatedAnswer, isCorrect: false };
  //     }
  //     return { ...formatedAnswer, isCorrect: true };
  //   });
  //   return checkedAnswers;
  // }

  goToExercisePage(exercise: IExercise) {
    this.router.navigate([`/exercises/exercise/${exercise._id}`]);
  }
}
