import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { IUser } from '../../../../models/user';
import { AnswerGrammarService } from '../../../../services/answer-grammar/answer-grammar.service';
import { getExercisesById, getStatistics, makeExercisesIdSet } from '../../../../helpers/forExercisesStatistics';

@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrl: './student-item.component.scss',
})
export class StudentItemComponent {
  student: IUser;
  statistics: any;


     line = {
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            label: 'Nice!',
            data: [5, 7, 9],
            fill: false,
            borderColor: '#ecca81f2',
            tension: 0.4,
          },
          {
            label: 'Boo...',
            data: [5, 3, 1],
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
              color: 'black',
            },
          },
        },
      },
  };
  
  testData = {
            labels: ['A','B'],
            datasets: [
                {
                    data: [300, 50],
                    backgroundColor: [
                        "#ecca81b3",
                        "#b8d9de80",
                    ],
                    hoverBackgroundColor: [
                        "#ecca81f2",
                        "#aadce3",
                    ]
                }
            ]
        };


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private answerGrammarService: AnswerGrammarService
  ) {}

  ngOnInit() {
    const routerIdParam = this.route.snapshot.paramMap.get('id') as string; // for route
    const querryIdParam = this.route.snapshot.queryParamMap.get('id') as string; // for queryParams
    const paramValueId = routerIdParam || querryIdParam;

    if (paramValueId) {
      this.getStudentInfo(paramValueId);
      this.getStudentAnswers(paramValueId);
    }

    // if (this.student !== undefined || null ) {
    //     const id = this.student._id as string
    //     this.getStudentAnswers(id)
    //   }

    //  this.answers = this.studentAnswers.map(el => el._id)
  }

  getStudentInfo(id: string) {
    this.userService.getUserById(id).subscribe((data) => {
      console.log(data);
      this.student = data;
    });
  }

  getStudentAnswers(userId: string) {
    // THIS CODE WORKS
    this.answerGrammarService
      .getAnswerForAdminByUser(userId)
      .subscribe((data) => {
        if (Array.isArray(data)) {
          // console.log('DATA NO PIPE', data);

          const exerciseIdSet = makeExercisesIdSet(data);
          console.log('exerciseIdSet', exerciseIdSet);

          const exersisesById = getExercisesById(data, exerciseIdSet);
          console.log('EXERCISES BY ID', exersisesById);

          const statistics = exersisesById.map((exersiseByIdArray) => {
            return getStatistics(exersiseByIdArray)
          });
          console.log('STATISTICS', statistics);

          this.statistics = statistics; 
        }
      });
  }

  // makeExercisesIdSet(allUserAnswers: IAnswerForDb[]) {
  //   const exerciseIdSet = new Set<string>();
  //   allUserAnswers.forEach((el) => exerciseIdSet.add(el.exerciseId));
  //   return exerciseIdSet;
  // }

  // getExercisesById(allExercises: IAnswerForDb[], idSet: Set<string>) {
  //   const idArray = Array.from(idSet);
  //   const exercisesById = idArray.map((el) => {
  //     const exer = allExercises.filter(
  //       (exercise) => exercise.exerciseId === el
  //     );
  //     return exer;
  //   });
  //   return exercisesById;
  // }

  // getStatistics(exersiseByIdArray: IAnswerForDb[]) {
  //   const tries = exersiseByIdArray.length;
  //   // console.log('TRIES', tries);
  //   const lastEx = exersiseByIdArray[exersiseByIdArray.length - 1];
  //   // console.log('LAST EX', lastEx);

  //   const checkedAnswers = lastEx.studentAnswers.map((el) => el.isCorrect);
  //   // console.log(checkedAnswers);

  //   const trues = checkedAnswers.filter((el) => el === true);
  //   // console.log('TRUES', trues);

  //   const percentPerPoint = 100 / checkedAnswers.length;
  //   // console.log('percent per point', percentPerPoint);

  //   const percentOfCorrectAnswers = trues.length * percentPerPoint;
  //   // console.log('percent of correct answers', percentOfCorrectAnswers);

  //   const percentOfWrongAnswers = 100 - percentOfCorrectAnswers;
  //   // console.log('percent of wrong answers', percentOfWrongAnswers);

  //   return {
  //     tries, 
  //     lastEx, 
  //     percentPerPoint, 
  //     percentOfCorrectAnswers, 
  //     percentOfWrongAnswers
  //   }
  // }
}
