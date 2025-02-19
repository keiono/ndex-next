export interface Network {
  name: string
  description?: string
  externalId: string
  ownerUUID: string
  isReadOnly: boolean
  visibility: string
  nodeCount: number
  edgeCount: number
  creationTime: number
  modificationTime: number
}

export interface NetworkSearchResult {
  numFound: number
  start: number
  networks: Network[]
}
