import { NetworkSummary } from './NetworkSummary'

export interface NetworkSearchResponse {
  networks: NetworkSummary[]
  numFound: number
  start: number
}
