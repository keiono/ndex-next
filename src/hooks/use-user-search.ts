import { useConfig } from '@/lib/contexts/ConfigContext'
import { UserSearchParams, UserSearchResponse } from '../types/api/ndex'
import useSWR from 'swr'

const EMPTY_USER_RESULT: UserSearchResponse = {
  resultList: [],
  numFound: 0,
  start: 0,
}
const buildUrl = (baseUrl: string, params: UserSearchParams) => {
  // Include all required parameters in the URL query params
  const queryParams = new URLSearchParams()
  if (params.searchString) {
    queryParams.set('searchString', params.searchString)
  }

  return `${baseUrl}?${queryParams.toString()}`
}

const fetcher = async (url: string, params: UserSearchParams) => {
  const fullUrl = buildUrl(url, params)

  // Ensure the POST body matches exactly what the API expects
  const body: UserSearchParams = {
    searchString: params.searchString || '',
  }

  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export const useUserSearch = (params: UserSearchParams) => {
  const config = useConfig()
  const url: string = `https://${config.ndexBaseUrl}/v2/search/user`
  // Create a cache key that changes when any relevant param changes
  const cacheKey = JSON.stringify({
    url,
    searchString: params.searchString || '',
    start: 0,
    size: 2000,
  })

  const { data, error, isLoading } = useSWR<UserSearchResponse, Error>(
    cacheKey,
    () => fetcher(url, params),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
      fallbackData: EMPTY_USER_RESULT,
      keepPreviousData: false,
      suspense: false,
      revalidateOnMount: true,
    },
  )

  return {
    users: data?.resultList || [],
    error,
    isLoading,
    total: data?.numFound || 0,
  }
}
