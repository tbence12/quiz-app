export interface OutputQuizModel {
  name: string,
  questionIds: string[],
}

export interface QuizModel extends OutputQuizModel {
  _id: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}
