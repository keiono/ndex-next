import useSWR from 'swr'
import { useConfig } from '@/lib/contexts/ConfigContext'
import { User } from '@/types/api/ndex/User'
import { getNdexClient } from '../lib/api/ndex-client-manager'

export function useUser(uuid: string) {
  const config = useConfig()
  const { ndexBaseUrl } = config
  const ndexClient = getNdexClient(ndexBaseUrl)

  // Use uuid as the key and ndexClient.getUserProfile as fetcher.
  const { data, error, isLoading } = useSWR<User>(uuid, () =>
    ndexClient.getUser(uuid),
  )

  return {
    user: data,
    isLoading,
    error: error?.message || null,
  }
}
