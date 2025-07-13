import { useQuery } from '@tanstack/react-query'
import type { GetRoomQuestionsAPIResponse } from './types/get-room-questions'

export function useRoomQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}/questions`
      )
      const result: GetRoomQuestionsAPIResponse = await response.json()
      return result
    },
  })
}
