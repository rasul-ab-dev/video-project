import { BounceLoader } from 'react-spinners'
import { VideoPlayer, VideoThumbs } from './components'
import { useSyncVidoes } from './hooks'
import { db, videoLinks } from './lib'
import { usePlayerStore } from './store'

function App() {
  const { videoURLs, isLoading, isCompleted } = useSyncVidoes({
    links: videoLinks,
    db: db
  })

  const setIsOpen = usePlayerStore((s) => s.setIsOpen)
  const setVideoIndex = usePlayerStore((s) => s.setVideoIndex)
  // const {} = usePlayerStore()

  function openFullscreen() {
    const elem = document.documentElement as any
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  }

  const handleOpenFullScreen = () => {
    openFullscreen()
    setIsOpen(true)
  }
  const handleStart = () => {
    setVideoIndex(0)
    handleOpenFullScreen()
  }
  return (
    <div className='p-4'>
      <div className='flex gap-6 items-center justify-center mb-5'>
        <button
          onClick={handleStart}
          disabled={!isCompleted}
          className='py-3 px-10 bg-sky-600 active:bg-sky-700 text-slate-100 rounded disabled:bg-gray-400'>
          Start
        </button>
        {isLoading && (
          <BounceLoader
            color='#0284C7'
            size={40}
          />
        )}
      </div>

      <VideoThumbs
        videos={videoURLs}
        placeholderList={videoLinks}
        handleOpenFullScreen={handleOpenFullScreen}
      />

      <VideoPlayer videos={videoURLs} />
    </div>
  )
}

export default App
