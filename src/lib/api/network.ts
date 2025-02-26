import { NetworkSearchParams, NetworkSearchResponse } from '@/types/api/ndex'

/**
 * TODO: replace with NDEx client library
 *
 * @param url
 * @param params
 * @returns
 */
export const networkListFetcher = async (
  url: string,
  params: NetworkSearchParams,
) => {
  // Extract start and size from URL

  // Add pagination to search params
  const requestBody = {
    ...params,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    // Handle error responses
    const error = new Error('Failed to fetch networks')
    error.message = await response.text()
    throw error
  }

  return response.json() as Promise<NetworkSearchResponse>
}
