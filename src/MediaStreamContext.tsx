import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the type for MediaStream
export type MediaStreamType = MediaStream | null

// Define the context type
interface MediaStreamContextType {
  storedMediaStream: MediaStreamType
  setStoredMediaStream: React.Dispatch<React.SetStateAction<MediaStreamType>>
}

// Create the context
const MediaStreamContext = createContext<MediaStreamContextType>({
  storedMediaStream: null,
  setStoredMediaStream: () => {},
})

// Export the hook for using MediaStreamContext
export const useMediaStream = () => useContext(MediaStreamContext)

// Define props for the provider
interface MediaStreamProviderProps {
  children: ReactNode
}

// Create the provider component
export const MediaStreamProvider: React.FC<MediaStreamProviderProps> = ({
  children,
}) => {
  const [storedMediaStream, setStoredMediaStream] =
    useState<MediaStreamType>(null)

  return (
    <MediaStreamContext.Provider
      value={{ storedMediaStream, setStoredMediaStream }}
    >
      {children}
    </MediaStreamContext.Provider>
  )
}
