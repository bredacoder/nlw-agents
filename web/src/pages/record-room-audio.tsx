import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAudioRecorder } from '@/hooks/use-audio-recorder'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const { roomId } = useParams<RoomParams>()

  const { isRecording, start, stop } = useAudioRecorder(async (blob) => {
    if (!roomId) {
      return
    }

    const formData = new FormData()
    formData.append('file', blob, 'audio.webm')
    await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}/audio`, {
      method: 'POST',
      body: formData,
    })
  })

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stop}>Stop Recording</Button>
      ) : (
        <Button onClick={start}>Record Audio</Button>
      )}
      {isRecording ? <p>Recording...</p> : <p>Paused</p>}
    </div>
  )
}
