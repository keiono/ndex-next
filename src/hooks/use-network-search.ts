import useSWRInfinite from 'swr/infinite'

import {
  NetworkSearchParams,
  NetworkSearchResponse,
  NetworkSummary,
} from '@/types/api/ndex'
import { networkListFetcher } from '../lib/api/network'
import { useConfig } from '../lib/contexts/ConfigContext'

const PAGE_SIZE = 500

export function useNetworkSearch(params: NetworkSearchParams) {
  const config = useConfig()
  const searchNetworkUrl: string = `${config.ndexBaseUrl}/search/network`

  const getKey = (
    pageIndex: number,
    previousPageData: NetworkSearchResponse | null,
  ) => {
    if (!previousPageData) {
      // Initial fetch
      return `${searchNetworkUrl}?start=0&size=${PAGE_SIZE}`
    }
    if (
      previousPageData &&
      previousPageData.numFound <= pageIndex * PAGE_SIZE
    ) {
      return null
    }

    // Return a string key instead of a number
    // const start = pageIndex * PAGE_SIZE
    return `${searchNetworkUrl}?start=${pageIndex}&size=${PAGE_SIZE}`
  }

  const fetcher = async (url: string) => {
    console.log('URL==>', url)
    console.log(`Fetching networks from ${url}`)
    const response = await networkListFetcher(url, params)

    if (!response || !Array.isArray(response.networks)) {
      throw new Error('Invalid response from server')
    }

    console.log(`Received ${response.networks.length} networks`)
    return response
  }

  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite<NetworkSearchResponse>(getKey, fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      parallel: false,
      revalidateFirstPage: false,
    })

  // Flatten networks without losing any results
  const networks: NetworkSummary[] = data
    ? data.flatMap((page) => page.networks ?? [])
    : []

  // Only deduplicate if needed
  const uniqueNetworks: NetworkSummary[] = Array.from(
    new Map(
      networks.map((network) => [
        // Create a more specific key if needed
        `${network.externalId}_${network.name}`,
        network,
      ]),
    ).values(),
  )

  console.log(`Networks after deduplication: ${uniqueNetworks.length}`)

  // Debug information
  console.log(`Total data`, data)
  console.log(`Network pages loaded: ${data?.length || 0}`)
  console.log(`Total networks after flattening: ${uniqueNetworks.length}`)

  // Use the numFound from the first page (if available)
  const totalCount = data?.[0]?.numFound ?? 0

  // More accurate hasMore calculation
  const maxPages = Math.ceil(totalCount / PAGE_SIZE)
  const hasMore = size < maxPages

  console.log(`Current state:`, {
    networksLoaded: uniqueNetworks.length,
    totalCount,
    currentPage: size,
    hasMore,
    isLoading,
    isValidating,
  })

  const loadMore = () => {
    const maxPages = Math.ceil(totalCount / PAGE_SIZE)

    // Only increment size if we haven't reached the maximum number of pages
    if (hasMore && !isLoading && size < maxPages) {
      console.log(
        `@@@@@@@@@@@@Loading more networks... (page ${
          size + 1
        } of ${maxPages})`,
      )
      setSize(size + 1)
    } else if (size >= maxPages) {
      console.log(
        `!!!!!!!!!All pages loaded: ${size} pages for ${totalCount} networks`,
      )
    }
  }

  return {
    networks: uniqueNetworks,
    totalCount,
    isLoading,
    error,
    hasMore,
    loadMore,
  }
}
