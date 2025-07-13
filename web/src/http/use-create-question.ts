import { useMutation, useQueryClient } from '@tanstack/react-query'
import type {
  CreateQuestionRequest,
  CreateQuestionResponse,
} from './types/create-question'
import type { GetRoomQuestionsAPIResponse } from './types/get-room-questions'

export function useCreateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ roomId, question }: CreateQuestionRequest) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question }),
        }
      )

      const result: CreateQuestionResponse = await response.json()
      return result
    },

    onMutate({ question, roomId }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsAPIResponse>([
        'get-questions',
        roomId,
      ])

      const questionsArray = questions ?? []

      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      }

      queryClient.setQueryData<GetRoomQuestionsAPIResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      )

      return { newQuestion, questions }
    },

    onError(_, { roomId }, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsAPIResponse>(
          ['get-questions', roomId],
          context.questions
        )
      }
    },

    onSuccess: (data, { roomId }, context) => {
      queryClient.setQueryData<GetRoomQuestionsAPIResponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) {
            return questions
          }

          if (!context?.newQuestion) {
            return questions
          }

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...context.newQuestion,
                id: data.questionId,
                answer: data.answer,
                isGeneratingAnswer: false,
              }
            }

            return question
          })
        }
      )
    },
  })
}
