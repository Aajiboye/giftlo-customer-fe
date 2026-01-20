'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  Table as ITable,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@ui/table';
import * as React from 'react';

import Empty from "../common/emptyState";
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import Loading from '../common/loader';

export interface FilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}
interface DataWithId {
  id: string | number;
}
interface DataTableProps<TData extends DataWithId, TValue, TStatus> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  toolbarStyles?: string;
  tableHeadStyles?: string;
  filterByStatus?: FilterOption[];
  isSearch: boolean;
  isStatus: boolean;
  isFilter: boolean;
  isBadgeStatus?: boolean;
  isPagination?: boolean;
  paginationStyle?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  isToolbar?: boolean;
  headBg?: string;
  bodyCellStyles?: string;
  isLoading?: boolean;
  navChildren?: (table: ITable<TData>) => React.ReactNode;
  pageSize?: number;
  pageNumber?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  filterOptions?: FilterOption[];
  onFilterChange?: (value: string) => void;
  onDateChange?: (date: Date | null) => void;
  onSearchChange?: (searchValue: string) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  currentPage?: number;
  totalItems?:number;
  itemsPerPage?:number;
}

export function DataTable<TData extends DataWithId, TValue, TStatus>({
  columns,
  data,
  title,
  description,
  toolbarStyles,
  tableHeadStyles,
  filterByStatus,
  isSearch = true,
  isStatus,
  isFilter,
  isBadgeStatus,
  isPagination = true,
  emptyTitle = 'No facilities yet',
  emptyDescription = 'Your facilities would appear here',
  paginationStyle,
  isToolbar = true,
  headBg,
  bodyCellStyles,
  isLoading,
  navChildren,
  pageSize = 5,
  pageNumber = 1,
  onPageChange,
  onPageSizeChange,
  onFilterChange,
  onDateChange,
  onSearchChange,
  onNextPage, onPreviousPage, totalItems, currentPage, itemsPerPage
}: DataTableProps<TData, TValue, TStatus>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: { pageIndex: pageNumber - 1, pageSize }
    },
    manualPagination: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowId: (row) => String(row.id),
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex: pageNumber - 1, pageSize })
          : updater;
      onPageChange && onPageChange(newPagination.pageIndex + 1);
      onPageSizeChange && onPageSizeChange(newPagination.pageSize);
    }
  });

  return (
    <div>
      {isToolbar && (
        <DataTableToolbar
          data={data}
          isSearch={isSearch}
          isStatus={isStatus}
          isFilter={isFilter}
          description={description}
          isBadgeStatus={isBadgeStatus}
          searchInputPlaceHolder="Search"
          onSearchInput={(e) => null}
          styles={toolbarStyles}
          filterByStatus={filterByStatus}
          title={title}
          table={table}
          navChildren={navChildren}
        />
      )}

      <div className={`border ${tableHeadStyles} overflow-hidden`}>
        {isLoading ? (
          <div className="h-fit text-center">
            {/* Show a loading spinner or skeleton */}
            <Loading />
            {/* Loading... */}
          </div>
        ) : data?.length === 0 ? (
          <Empty title={emptyTitle} description={emptyDescription} />
        ) : (
          <Table className='bg-white shadow-lg'>
            <TableHeader
              className={
                headBg ? `${headBg} text-white` : `bg-sidebar_bg text-white`
              }
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="whitespace-nowrap"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={`${bodyCellStyles} truncate max-w-md `}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-24 text-center "
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {isPagination && (
        <DataTablePagination table={table} paginationStyle={paginationStyle} onNextPage={onNextPage} onPreviousPage={onPreviousPage} totalItems={totalItems} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
      )}
    </div>
  );
}
