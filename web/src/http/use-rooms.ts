import { useQuery } from '@tanstack/react-query'
import type { GetRoomsAPIResponse } from './types/get-rooms'

export function useRooms() {
  return useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`)
      const result: GetRoomsAPIResponse = await response.json()
      return result
    },
  })
}
