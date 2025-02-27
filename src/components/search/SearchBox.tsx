'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchStore } from '@/stores/search-store'

export function SearchBox() {
  const { setQuery } = useSearchStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentQuery, setCurrentQuery] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const urlQuery = searchParams.get('q')
    if (urlQuery) {
      // Decode the URL query and set it to the input
      setCurrentQuery(decodeURIComponent(urlQuery))
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextQuery = currentQuery.trim()
    // Early return if query is empty - this prevents any submission logic
    if (!nextQuery) {
      console.log('Empty search prevented')
      return
    }

    setQuery(nextQuery)
    router.push(`/search?q=${encodeURIComponent(nextQuery)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !currentQuery.trim()) {
      e.preventDefault()
      console.log('Empty search prevented (Enter key)')
    }
  }

  useEffect(() => {
    const input = inputRef.current
    if (!input) return

    const handleSearch = () => {
      // This will only fire when the search is cleared via the "x" button
      if (input.value === '') {
        console.log('Search cleared via x button')
        setCurrentQuery('')
        // Optional: Also clear the store and URL
        setQuery('')
        router.push('/search')
      }
    }

    input.addEventListener('search', handleSearch)
    return () => input.removeEventListener('search', handleSearch)
  }, [setQuery, router])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-6xl items-center space-x-2"
    >
      <Input
        ref={inputRef}
        type="search"
        placeholder="Enter search term..."
        value={currentQuery}
        onChange={(e) => setCurrentQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center gap-2">
        <Button type="submit" variant="outline" disabled={!currentQuery.trim()}>
          Search
        </Button>
      </div>
    </form>
  )
}
