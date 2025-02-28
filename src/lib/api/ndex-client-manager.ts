// @ts-expect-error-next-line
import { NDEx } from '@js4cytoscape/ndex-client'

const DEF_URL = 'ndexbio.org'
let ndexClient: NDEx = new NDEx(DEF_URL)

export const getNdexClient = (url: string, accessToken?: string): NDEx => {
  if (url === undefined || url === '') {
    ndexClient = new NDEx(DEF_URL)
  } else if (url !== ndexClient.host) {
    ndexClient = new NDEx(url)
  }

  if (accessToken !== undefined && accessToken !== '') {
    ndexClient.setAuthToken(accessToken)
  }
  return ndexClient
}
