'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface SearchBoxProps {
  defaultTerm?: string
  totalCount?: number
}

export function SearchBox({ defaultTerm = '', totalCount }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState(defaultTerm)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-6xl items-center space-x-2">
      <Input 
        type="search" 
        placeholder="NDEx search term..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <Button 
          type="submit" 
          variant="outline"
          disabled={!searchTerm.trim()}
        >
          Search
        </Button>
        {totalCount !== undefined && totalCount >= 0 && (
          <span className="text-sm text-muted-foreground">
            {totalCount} hits
          </span>
        )}
      </div>
    </form>
  )
}
