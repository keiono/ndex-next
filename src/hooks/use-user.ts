import useSWR from 'swr'
import { useConfig } from '@/lib/contexts/ConfigContext'
import { User } from '@/types/api/ndex/User'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`)
  }
  return response.json()
}

export function useUserProfile(uuid: string | undefined) {
  const config = useConfig()

  const { data, error, isLoading } = useSWR<User>(
    uuid ? `${config.ndexBaseUrl}/user/${uuid}` : null,
    fetcher,
  )

  return {
    user: data,
    isLoading,
    error: error?.message || null,
  }
}
