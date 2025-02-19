'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { useNetworkSearch } from '@/services/ndex-service'

export function TabsPanel() {
  const searchParams = {
    searchString: '*',
    start: 0,
    size: 25,
  }
  const { data, error, isLoading } = useNetworkSearch(searchParams)

  return (
    <Card className="p-4">
      <Tabs defaultValue="networks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="networks">Networks</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
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
            {data?.networks && (
              <div className="space-y-4">
                {data.networks.map((network) => (
                  <div
                    key={network.externalId}
                    className="border p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <h3 className="font-medium">{network.name}</h3>
                    {network.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {network.description}
                      </p>
                    )}
                    <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Nodes: {network.nodeCount}</span>
                      <span>Edges: {network.edgeCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
