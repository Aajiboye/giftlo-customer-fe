import { Table } from '@tanstack/react-table';

import { Button } from '@ui/button';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationStyle?: string;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
}

export function DataTablePagination<TData>({
  table, paginationStyle,  onNextPage, onPreviousPage, currentPage, totalItems, itemsPerPage
}: DataTablePaginationProps<TData>) {
  return (
    table && (
      <div className={`flex items-center justify-end space-x-2 py-4 font-semibold ${paginationStyle}`}>
        <div className="flex-1 text-sm text-muted-foreground">
          Page {currentPage ? currentPage : table?.getState()?.pagination?.pageIndex + 1} of{' '} {(totalItems && itemsPerPage) ? Math.ceil(totalItems / itemsPerPage) : table?.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            className={'font-semibold'}
            variant="outline"
            size="sm"
            onClick={() => onPreviousPage? onPreviousPage() : table?.previousPage()}
            disabled={currentPage ? currentPage === 1: !table?.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            className={'font-semibold'}
            variant="outline"
            size="sm"
            onClick={() => onNextPage ? onNextPage() : table?.nextPage()}
            disabled={(totalItems && itemsPerPage) ? Math.ceil(totalItems/itemsPerPage) === currentPage : !table?.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    )
  );
}
