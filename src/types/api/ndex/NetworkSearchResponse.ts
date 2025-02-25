import { NetworkSummary } from './NetworkSummary'

export interface NetworkSearchResponse {
  networks: NetworkSummary[]
  totalCount: number
}
