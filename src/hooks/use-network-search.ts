import useSWRInfinite from 'swr/infinite'

import {
  NetworkSearchParams,
  NetworkSearchResponse,
  NetworkSummary,
} from '@/types/api/ndex'
import { networkListFetcher } from '../lib/api/network'
import { useConfig } from '../lib/contexts/ConfigContext'

const PAGE_SIZE = 200

export function useNetworkSearch(params: NetworkSearchParams) {
  const config = useConfig()
  const searchNetworkUrl: string = `${config.ndexBaseUrl}/search/network`

  // Check for empty search string
  const isEmptyQuery = !params.searchString || params.searchString.trim() === ''

  console.log(
    'Query==========>',
    isEmptyQuery ? '(empty)' : params.searchString,
  )

  // Create a unique cache key that changes when the search query changes
  const searchKey = isEmptyQuery ? 'empty' : params.searchString

  // Fix #1: Type the getKey function properly
  // Update getKey to include the search query in the key
  const getKey = (
    pageIndex: number,
    previousPageData: NetworkSearchResponse | null,
  ): string | null => {
    // Return null for empty queries to prevent fetching
    if (isEmptyQuery) return null

    if (!previousPageData) {
      // Include searchString in the key to ensure cache invalidation
      return `${searchNetworkUrl}?start=0&size=${PAGE_SIZE}&q=${encodeURIComponent(
        searchKey,
      )}`
    }

    if (previousPageData.numFound <= pageIndex * PAGE_SIZE) {
      return null
    }

    const start = pageIndex * PAGE_SIZE
    // Include searchString in the key to ensure cache invalidation
    return `${searchNetworkUrl}?start=${start}&size=${PAGE_SIZE}&q=${encodeURIComponent(
      searchKey,
    )}`
  }

  // Fix #2: Make fetcher always return NetworkSearchResponse (not null)
  const fetcher = async (url: string): Promise<NetworkSearchResponse> => {
    // Safety check for no URL - return empty result instead of null
    if (!url) {
      return {
        networks: [],
        numFound: 0,
        start: 0,
      } as NetworkSearchResponse
    }

    // Additional check for empty query - return empty result
    if (isEmptyQuery) {
      console.log('Fetcher detected empty query, returning empty result')
      return {
        networks: [],
        numFound: 0,
        start: 0,
      } as NetworkSearchResponse
    }

    console.log('URL==>', url)
    console.log(`Fetching networks from ${url}`)
    const response = await networkListFetcher(url, params)

    if (!response || !Array.isArray(response.networks)) {
      throw new Error('Invalid response from server')
    }

    console.log(`Received ${response.networks.length} networks`)
    return response
  }

  // Now the types should match correctly
  // Add searchKey as dependency to SWR options
  const { data, isLoading, error, size, setSize, isValidating } =
    useSWRInfinite<NetworkSearchResponse>(getKey, fetcher, {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 1000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      parallel: false,
      revalidateFirstPage: false,
      // Reset size to 1 whenever searchKey changes
      revalidateAll: true,
      // This key helps SWR know when to reset the cache
      onSuccess: () => {
        console.log('Fetched data for query:', searchKey)
      },
    })

  // Rest of the function remains the same...

  // For empty queries, return empty result after the hook is called
  if (isEmptyQuery) {
    return {
      networks: [],
      totalCount: 0,
      isLoading: false,
      error: null,
      hasMore: false,
      loadMore: () => {},
    }
  }

  // Continue with normal processing for non-empty queries
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
