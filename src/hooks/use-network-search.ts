import useSWR from 'swr'
import { NetworkSearchParams, NetworkSearchResponse } from '@/types/api/ndex'
import { networkListFetcher } from '../lib/api/network'
import { useConfig } from '../lib/contexts/ConfigContext'
import { AppConfig } from '../types/entities/AppConfig'

export function useNetworkSearch(params: NetworkSearchParams) {
  // Server URL is always provided by the config
  const config: AppConfig = useConfig()
  const url: string = `${config.ndexBaseUrl}/search/network`
  const cacheKey = [url, params]

  const { data, error, isLoading, mutate } = useSWR<NetworkSearchResponse>(
    cacheKey,
    () => networkListFetcher(url, params),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  return {
    networks: data?.networks ?? [],
    totalCount: data?.totalCount ?? 0,
    isLoading,
    error,
    mutate,
  }
}
