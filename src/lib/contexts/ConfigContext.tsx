'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AppConfig } from '@/types/entities/AppConfig'

interface ConfigProviderProps {
  children: ReactNode
}
// Create a context for the configuration
const ConfigContext = createContext<AppConfig | null>(null)

// Provider component that fetches the config
export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [config, setConfig] = useState<AppConfig | null>(null)

  useEffect(() => {
    fetch('/config.json')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((error) => console.error('Failed to load config:', error))
  }, [])

  if (!config) {
    return <div>Loading configuration...</div>
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

// Custom hook to access config values
export const useConfig = () => {
  const config = useContext(ConfigContext)
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return config
}
