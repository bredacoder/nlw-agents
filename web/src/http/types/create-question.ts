export type CreateQuestionRequest = {
  roomId: string
  question: string
}

export type CreateQuestionResponse = {
  questionId: string
  answer: string | null
}
