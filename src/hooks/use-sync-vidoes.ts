import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Video, db, videoLinks } from '../lib'

interface Props {
  links: typeof videoLinks
  db: typeof db
}

export const useSyncVidoes = ({ links, db }: Props) => {
  const [videos, setVideos] = useState<Video[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const videoURLs = useMemo(
    () => videos.map((v) => URL.createObjectURL(v.blob)),
    [videos]
  )

  useEffect(() => {
    const init = async () => {
      const dbVideos = await db.videos.toArray()

      const isCompleted =
        dbVideos.filter((d) => d.blob).length === links.length

      setIsCompleted(isCompleted)
      if (isCompleted) {
        setVideos(dbVideos)
        return
      }

      setIsLoading(true)
      const promises = links.map((link) => {
        return axios.get(link.url, {
          responseType: 'blob'
        })
      })

      const responses = await Promise.all(promises)
        .catch((e) => console.log(e))
        .finally(() => {
          setIsLoading(false)
        })

      if (responses) {
        const blobs = responses.map((r) => {
          return {
            blob: r?.data as Blob
          }
        })

        await db.videos.clear()

        await db.videos.bulkAdd(blobs)
        const dbVideos = await db.videos.toArray()
        setVideos(dbVideos)
      }
    }

    init()
  }, [links, db])

  return {
    videoURLs,
    isCompleted,
    isLoading
  }
}
