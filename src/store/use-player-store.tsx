import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Store {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  videoIndex: number
  setVideoIndex: (index: number) => void
}

export const usePlayerStore = create(
  immer<Store>((set) => ({
    isOpen: false,
    videoIndex: 0,
    setIsOpen: (isOpen) => set({ isOpen }),
    setVideoIndex: (videoIndex) => set({ videoIndex })
  }))
)
