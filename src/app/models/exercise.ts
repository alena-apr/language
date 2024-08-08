export interface IExercise {
  _id?: string;
  type: string;
  title: string;
  difficulty: number;
  realAnswers: IAnswer[] | [];
  text: IText[];
  studentAnswers: IRawAnswer[];
}

export interface IAnswerForDb extends IExercise {
  userId: string;
  exerciseId: string;
}

export interface IAnswer {
  id: number;
  answer: string;
}

export interface IText {
  id: number;
  text: string;
  transformedText: string[];
}

export interface IRawAnswer {
  id: number;
  answer?: string;
  isCorrect?: boolean;
}
