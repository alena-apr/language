import { Component } from '@angular/core';
import { IUser } from '../../../models/user';
import {  Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { AnswerGrammarService } from '../../../services/answer-grammar/answer-grammar.service';
import { IAnswerForDb } from '../../../models/exercise';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrl: './shelf.component.scss',
})
export class ShelfComponent {
  student: IUser;
  statistics: any;
  data: any;
  options: any;

  //    line = {
  //     data: {
  //       labels: ['1', '2', '3'],
  //       datasets: [
  //         {
  //           label: 'Nice!',
  //           data: [5, 7, 9],
  //           fill: false,
  //           borderColor: '#ecca81f2',
  //           tension: 0.4,
  //         },
  //         {
  //           label: 'Boo...',
  //           data: [5, 3, 1],
  //           fill: false,
  //           borderColor: '#b8d9de80',
  //           tension: 0.4,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       pligins: {
  //         legend: {
  //           labels: {
  //             color: 'black',
  //           },
  //         },
  //       },
  //     },
  //   };
  // testData = {
  //           labels: ['A','B'],
  //           datasets: [
  //               {
  //                   data: [300, 50],
  //                   backgroundColor: [
  //                       "#ecca81b3",
  //                       "#b8d9de80",
  //                   ],
  //                   hoverBackgroundColor: [
  //                       "#ecca81f2",
  //                       "#aadce3",
  //                   ]
  //               }
  //           ]
  //       };

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private answerGrammarService: AnswerGrammarService
  ) {}

  ngOnInit() {
    const user = this.userService.getUser();
    this.student = user;
    const userId = user._id;

    if (userId !== undefined) {
      this.getStudentAnswers(userId);
    }
  }

  getStudentAnswers(userId: string) {
    this.answerGrammarService.getAnswersByUser(userId).subscribe((data) => {
      if (Array.isArray(data)) {
        const exerciseIdSet = this.makeExercisesIdSet(data);
        const exersisesById = this.getExercisesById(data, exerciseIdSet);
        const statistics = exersisesById.map((exersiseByIdArray) => {
          return this.getStatistics(exersiseByIdArray);
        });
        this.statistics = statistics;
        console.log('STATISTICS', statistics);
      }
    });
  }

  makeExercisesIdSet(allUserAnswers: IAnswerForDb[]) {
    const exerciseIdSet = new Set<string>();
    allUserAnswers.forEach((el) => exerciseIdSet.add(el.exerciseId));
    return exerciseIdSet;
  }

  getExercisesById(allExercises: IAnswerForDb[], idSet: Set<string>) {
    const idArray = Array.from(idSet);
    const exercisesById = idArray.map((el) => {
      const exer = allExercises.filter(
        (exercise) => exercise.exerciseId === el
      );
      return exer;
    });
    return exercisesById;
  }

  getStatistics(exersiseByIdArray: IAnswerForDb[]) {
    const tries = exersiseByIdArray.length;
    const lastEx = exersiseByIdArray[exersiseByIdArray.length - 1];
    const lastExId = lastEx.exerciseId;
    const checkedAnswers = this.getIsCorrectArray(lastEx);
    const trues = checkedAnswers.filter((el) => el === true);
    const falses = checkedAnswers.filter((el) => el === false);
    const percentPerPoint = 100 / checkedAnswers.length;
    const percentOfCorrectAnswers = parseFloat(this.getNiceDecimal(trues.length * percentPerPoint));
    // const percentOfCorrectAnswers = parseFloat(percentOfCorrectAnswersRow);
    const percentOfWrongAnswers = 100 - percentOfCorrectAnswers;
    const truesNumber = trues.length;
    const falsesNumber = falses.length;

    const doughnut = {
      data: {
        labels: ['Nice!', 'Boo...'],
        datasets: [
          {
            data: [truesNumber, falsesNumber],
            backgroundColor: ['#ecca81b3', '#b8d9de80'],
            hoverBackgroundColor: ['#ecca81f2', '#aadce3'],
          },
        ],
      },
      options: {
        responsive: true,
        pligins: {
          legend: {
            labels: {
              color: '#fff',
            },
          },
        },
      },
    };
    const line = {
      data: {
        labels: [''],
        datasets: [
          {
            label: 'Nice!',
            data: [0],
            fill: false,
            borderColor: '#ecca81f2',
            tension: 0.4,
          },
          {
            label: 'Boo...',
            data: [0],
            fill: false,
            borderColor: '#b8d9de80',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        pligins: {
          legend: {
            labels: {
              color: '#000',
            },
          },
        },
      },
    };

    exersiseByIdArray.forEach((el, index) => {
      line.data.labels.push(`Attempt ${index + 1}`);
      const checkedAnswers = this.getIsCorrectArray(el);
      const trues = checkedAnswers.filter((el) => el === true);
      const falses = checkedAnswers.filter((el) => el === false);
      const falsesNumberForEach = falses.length;
      const truesNumberForEach = trues.length;
      line.data.datasets[0].data.push(truesNumberForEach);
      line.data.datasets[1].data.push(falsesNumberForEach);
    });

    const statisticsInfo = {
      tries,
      lastEx,
      lastExId,
      percentPerPoint,
      percentOfCorrectAnswers,
      percentOfWrongAnswers,
      doughnut,
      line,
    };

    return statisticsInfo;
  }

  getIsCorrectArray(oneExercise: IAnswerForDb) {
    return oneExercise.studentAnswers.map((el) => el.isCorrect);
  }

  getNiceDecimal(number: any) {
    return Number.parseFloat(number).toFixed(1);
  }

  goToExercise(id: string) {
    this.router.navigate([`/exercises/exercise/${id}`]);
  }
}
