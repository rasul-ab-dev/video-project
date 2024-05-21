import { usePlayerStore } from '../store'

interface Props {
  videos: string[]
  placeholderList: any[]
  handleOpenFullScreen: () => void
}

export const VideoThumbs = (props: Props) => {
  const { videos, placeholderList, handleOpenFullScreen } = props
  const setVideoIndex = usePlayerStore((s) => s.setVideoIndex)

  return (
    <div className='flex items-center flex-wrap gap-6'>
      {videos.length === 0 &&
        placeholderList &&
        placeholderList.map((_, i) => {
          return (
            <div
              key={i}
              className='bg-gray-200 w-[67px] h-[145px]'
            />
          )
        })}

      {videos.map((video, i) => {
        return (
          <div
            className='cursor-pointer'
            key={video}
            onClick={() => {
              setVideoIndex(i)
              handleOpenFullScreen()
            }}>
            <video
              autoPlay
              loop
              muted
              src={video}
              width={67}
              height={145}
            />
          </div>
        )
      })}
    </div>
  )
}
