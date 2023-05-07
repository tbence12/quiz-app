export type AnswerModel = {
  questionId: string,
  answerNumber: number,
  correct: boolean,
  _id?: string
}

export type ResultModel = {
  _id: string,
  result: number,
  answers: AnswerModel[],
  userId: string,
  quizId: string,
  quizName?: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}
