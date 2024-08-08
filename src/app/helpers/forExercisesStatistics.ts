import { IAnswerForDb } from '../models/exercise';

export function makeExercisesIdSet(allUserAnswers: IAnswerForDb[]) {
  const exerciseIdSet = new Set<string>();
  allUserAnswers.forEach((el) => exerciseIdSet.add(el.exerciseId));
  return exerciseIdSet;
}

export function getExercisesById(
  allExercises: IAnswerForDb[],
  idSet: Set<string>
) {
  const idArray = Array.from(idSet);
  const exercisesById = idArray.map((el) => {
    const exer = allExercises.filter((exercise) => exercise.exerciseId === el);
    return exer;
  });
  return exercisesById;
}

export function getStatistics(exersiseByIdArray: IAnswerForDb[]) {
  const tries = exersiseByIdArray.length;
  const lastEx = exersiseByIdArray[exersiseByIdArray.length - 1];
  const lastExId = lastEx.exerciseId;
  const checkedAnswers = getIsCorrectArray(lastEx);
  const trues = checkedAnswers.filter((el) => el === true);
  const falses = checkedAnswers.filter((el) => el === false);
  const percentPerPoint = 100 / checkedAnswers.length;
  const percentOfCorrectAnswers = parseFloat(getNiceDecimal(trues.length * percentPerPoint));
  // const percentOfCorrectAnswers = parseFloat(percentOfCorrectAnswersRow)
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
    const checkedAnswers = getIsCorrectArray(el);
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

export function getIsCorrectArray(oneExercise: IAnswerForDb) {
  return oneExercise.studentAnswers.map((el) => el.isCorrect);
}

export function getNiceDecimal(number: any) {
  return Number.parseFloat(number).toFixed(1);
}
