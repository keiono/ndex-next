'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { NetworkTable } from './NetworkTable'
import { useNetworkSearch } from '@/hooks/use-network-search'
import { useSearchParams } from 'next/navigation'
import { SearchBox } from './SearchBox'

export function TabsPanel() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  const { networks, error, isLoading, hasMore, loadMore, totalCount } = useNetworkSearch({
    searchString: query || '*',
  })

  return (
    <Card className="p-4">
      <div className="mb-6">
        <SearchBox totalCount={totalCount} />
      </div>
      <Tabs defaultValue="networks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="collections">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="networks">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Public Networks</h2>
            {isLoading && <p>Loading networks...</p>}
            {error && (
              <p className="text-red-500">
                Error loading networks: {error.message}
              </p>
            )}
            <NetworkTable 
              networks={networks} 
              isLoading={isLoading}
              hasMore={hasMore}
              onLoadMore={loadMore}
              totalCount={totalCount}
            />
          </div>
        </TabsContent>
        <TabsContent value="collections">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Collections</h2>
            <p>Collections feature coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
