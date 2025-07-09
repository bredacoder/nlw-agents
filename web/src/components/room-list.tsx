import { ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRooms } from '@/http/use-rooms'
import { getRelativeTime } from '@/utils/format-relative-date'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent rooms</CardTitle>
        <CardDescription>Quick access to recent</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center p-4 text-muted-foreground text-sm">
            Loading Rooms... <Loader2 className="ml-2 size-4 animate-spin" />
          </div>
        )}

        {data?.map((room) => (
          <Link
            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
            key={room.id}
            to={`/room/${room.id}`}
          >
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="font-medium">{room.name}</h3>

              <div className="flex items-center gap-2">
                <Badge className="text-xs" variant="secondary">
                  {getRelativeTime(new Date(room.createdAt))}
                </Badge>

                <Badge className="text-xs" variant="secondary">
                  {room.questionsCount} question(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1">
              Entrar
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
