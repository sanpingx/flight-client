// components/DynamicTable.tsx
'use client';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowData,
} from '@tanstack/react-table';
import { useState, useEffect, ReactNode } from 'react';

interface DynamicTableProps<TData extends RowData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  loading?: boolean;
  loadingComponent?: ReactNode;
  emptyComponent?: ReactNode;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  onRowClick?: (row: TData) => void;
}

export function DynamicTable<TData extends RowData>({
  columns,
  data,
  loading = false,
  loadingComponent = <div>Loading...</div>,
  emptyComponent = <div>No data available</div>,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  onRowClick,
}: DynamicTableProps<TData>) {
  const [internalData, setInternalData] = useState<TData[]>(data);

  useEffect(() => {
    setInternalData(data);
  }, [data]);

  const table = useReactTable({
    data: internalData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (data.length === 0 && !loading) {
    return <>{emptyComponent}</>;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead className={headerClassName}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left p-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`${rowClassName} ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`p-3 ${cellClassName}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}