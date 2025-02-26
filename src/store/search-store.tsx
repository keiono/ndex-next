import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchState {
  // State
  query: string
  previousQueries: string[]
  searchCount: number
  lastSearchTime: number | null

  // Actions
  setQuery: (query: string) => void
  clearQuery: () => void
  addToHistory: (query: string) => void
  clearHistory: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      // Initial state
      query: '',
      previousQueries: [],
      searchCount: 0,
      lastSearchTime: null,

      // Actions
      setQuery: (query: string) => {
        set({
          query,
          lastSearchTime: Date.now(),
          searchCount: get().searchCount + 1,
        })

        // Only add non-empty queries to history
        if (query.trim()) {
          get().addToHistory(query)
        }
      },

      clearQuery: () => set({ query: '' }),

      addToHistory: (query: string) => {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) return

        // Get current history and remove duplicates
        const currentQueries = get().previousQueries
        const newQueries = [
          trimmedQuery,
          ...currentQueries.filter((q) => q !== trimmedQuery),
        ].slice(0, 10) // Keep only the latest 10 queries

        set({ previousQueries: newQueries })
      },

      clearHistory: () => set({ previousQueries: [] }),
    }),
    {
      name: 'ndex-search-storage', // name for the persisted store in localStorage
      partialize: (state) => ({
        // Only persist these fields
        query: state.query,
        previousQueries: state.previousQueries,
      }),
    },
  ),
)
