export type AnswerModel = {
  questionId: string,
  answerNumber: number,
  correct: boolean,
  _id?: string
}

export interface ResultModel {
  result: number,
  answers: AnswerModel[],
  userId: string,
  quizId: string
}

export interface InputResultModel extends ResultModel {
  _id: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface DisplayedResultModel extends ResultModel {
  quizName?: string
}

export interface InputSummResultModel {
  scores: number,
  userId: string,
  username: string
  year: number,
}

export interface SummResultModel extends InputSummResultModel {
  position: string;
}
