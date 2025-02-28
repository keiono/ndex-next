import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import { User } from '@/types/api/ndex'

interface UserTableProps {
  users: User[]
  isLoading: boolean
  hasMore: boolean
  loadMore: () => void
  totalCount: number
  error?: Error
}

export function UserTable({
  users,
  isLoading,
  error,
  hasMore,
  loadMore,
  totalCount,
}: UserTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = React.useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'externalId',
      },
      {
        header: 'Username',
        accessorKey: 'userName',
      },
      {
        header: 'Display Name',
        accessorKey: 'displayName',
      },
      {
        header: 'Email',
        accessorKey: 'emailAddress',
      },
      {
        header: 'Created',
        accessorKey: 'creationTime',
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue() as string).toLocaleDateString() : '',
      },
    ],
    [],
  )

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && !isLoading && <button onClick={loadMore}>Load More</button>}
      <div>{totalCount} Users Total</div>
    </div>
  )
}
