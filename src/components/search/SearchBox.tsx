'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchStore } from '@/stores/search-store'

export function SearchBox() {
  const { query, setQuery } = useSearchStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentQuery, setCurrentQuery] = useState<string>('')

  // Set initial query from URL or default term
  useEffect(() => {
    const urlQuery = searchParams.get('q')
    if (urlQuery) {
      setQuery(urlQuery)
      setCurrentQuery(query)
    } else if (query) {
      setCurrentQuery(query)
    }
  }, [searchParams, query, setQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextQuery = currentQuery.trim()
    if (nextQuery) {
      setQuery(nextQuery)
      router.push(`/search?q=${encodeURIComponent(nextQuery)}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-6xl items-center space-x-2"
    >
      <Input
        type="search"
        placeholder="Enter search term..."
        value={currentQuery}
        onChange={(e) => setCurrentQuery(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Button type="submit" variant="outline" disabled={!currentQuery.trim()}>
          Search
        </Button>
      </div>
    </form>
  )
}
