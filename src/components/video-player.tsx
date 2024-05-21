import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { usePlayerStore } from '../store'

interface Props {
  videos: string[]
}

export const VideoPlayer = ({ videos }: Props) => {
  const { videoIndex, isOpen, setIsOpen, setVideoIndex } =
    usePlayerStore()

  const video = videos[videoIndex]

  useEffect(() => {
    const exitHandler = () => {
      if (!document.fullscreenElement) {
        setIsOpen(false)
      }
    }
    document.addEventListener('fullscreenchange', exitHandler)
    return () => {
      document.removeEventListener('fullscreenchange', exitHandler)
    }
  }, [])

  return (
    <div
      style={{
        display: isOpen ? 'flex' : 'none'
      }}
      className='absolute w-full h-full bg-white z-10 top-0 left-0 pr-4'>
      <div className='flex-1'>
        {video && (
          <ReactPlayer
            height={'100%'}
            width={'100%'}
            muted
            url={video}
            loop
            playing
          />
        )}
      </div>
      <ul className='max-h-full overflow-scroll'>
        {videos.map((v, i) => {
          const isActive = videoIndex === i
          return (
            <li
              key={v}
              style={{
                borderColor: isActive ? 'gray' : 'transparent'
              }}
              className='my-1 cursor-pointer  border-2 rounded-lg p-1'
              onClick={() => {
                setVideoIndex(i)
              }}>
              <video
                src={v}
                className='w-32 h-36'
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
