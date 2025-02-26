'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NetworkTable } from './NetworkTable'
import { useNetworkSearch } from '@/hooks/use-network-search'
import { useSearchParams } from 'next/navigation'
// import { SidebarTrigger } from '@/components/ui/sidebar'

export function TabsPanel() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  const { networks, error, isLoading, hasMore, loadMore, totalCount } =
    useNetworkSearch({
      searchString: query || '*',
    })

  return (
    <Tabs defaultValue="networks" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="networks">Networks</TabsTrigger>
        <TabsTrigger value="collections">Users</TabsTrigger>
      </TabsList>
      <TabsContent value="networks">
        <div className="p-4">
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
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p>Coming soon...</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}
