export interface SearchState {
  query: string
  previousQueries: string[]
  searchCount: number
  lastSearchTime: number | null
}

export interface SearchActions {
  setQuery: (query: string) => void
  clearQuery: () => void
  addToHistory: (query: string) => void
  clearHistory: () => void
}

export type SearchStore = SearchState & SearchActions
