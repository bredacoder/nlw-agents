export type GetRoomQuestionsAPIResponse = Array<{
  id: string
  question: string
  answer: string | null
  createdAt: string
  isGeneratingAnswer: boolean
}>
