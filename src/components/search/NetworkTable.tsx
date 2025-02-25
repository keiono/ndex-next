'use client'
import { NetworkSummary } from '@/types/api/ndex'
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type SortField = 'nodeCount' | 'edgeCount'
type SortDirection = 'asc' | 'desc'

interface NetworkTableProps {
  networks: NetworkSummary[]
}

export function NetworkTable({ networks }: NetworkTableProps) {
  const [sortField, setSortField] = useState<SortField>('nodeCount')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedNetworks = [...networks].sort((a, b) => {
    const modifier = sortDirection === 'asc' ? 1 : -1
    return (a[sortField] - b[sortField]) * modifier
  })

  if (!networks || networks.length === 0) {
    return <div>No networks found.</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created</TableHead>
          <TableHead 
            className={cn("cursor-pointer select-none", sortField === 'nodeCount' && "text-primary")}
            onClick={() => handleSort('nodeCount')}
          >
            Nodes {sortField === 'nodeCount' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
          <TableHead 
            className={cn("cursor-pointer select-none", sortField === 'edgeCount' && "text-primary")}
            onClick={() => handleSort('edgeCount')}
          >
            Edges {sortField === 'edgeCount' && (sortDirection === 'asc' ? '↑' : '↓')}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedNetworks.map((network: NetworkSummary) => (
          <TableRow key={network.externalId}>
            <TableCell>{network.name}</TableCell>
            <TableCell>{network.description}</TableCell>
            <TableCell>
              {new Date(network.creationTime).toLocaleDateString()}
            </TableCell>
            <TableCell>{network.nodeCount}</TableCell>
            <TableCell>{network.edgeCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
