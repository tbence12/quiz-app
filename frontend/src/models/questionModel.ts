type AnswerModel = {
  number: number,
  text: string,
  correct: boolean,
  _id: string
}

export type QuestionModel = {
  _id: string,
  text: string,
  answers: AnswerModel[],
  userId: string,
  categoryIds: string[],
  categoryName?: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}
