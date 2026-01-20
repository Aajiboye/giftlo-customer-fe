'use client';

import { Table } from '@tanstack/react-table';
import { ListFilter, Search, X } from 'lucide-react';

import { Button } from '@ui/button';
import { Input } from '@ui/input';

import { ChangeEvent } from 'react';
// import BadgeStatus from "../Facilities/badgeStatus";
import { FilterOption } from './data-table';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  data?: any;
  table: Table<TData>;
  title?: string;
  description?: string;
  filterByStatus?: FilterOption[];
  styles?: string;
  searchInputPlaceHolder: string;
  onSearchInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isSearch: boolean;
  isStatus: boolean;
  isFilter: boolean;
  isBadgeStatus?: boolean;
  navChildren?: (table: Table<TData>) => React.ReactNode;
}

export function DataTableToolbar<TData>({
  data,
  table,
  title,
  description,
  filterByStatus,
  styles,
  searchInputPlaceHolder = 'Filter tasks...',
  onSearchInput,
  isSearch,
  isStatus,
  isFilter,
  isBadgeStatus,
  navChildren
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className={`flex items-center justify-between gap-2 ${styles}`}>
      <div className="">
        {title && (
          <p className="text-black w-fit font-semibold text-lg">{title}</p>
        )}

        {description && (
          <p className="text-secondary w-fit text-md">{description}</p>
        )}
      </div>

      <div className={`flex justify-between ${!title && 'w-full'}`}>
        {/* not available */}
        {/* {isBadgeStatus && <BadgeStatus data={data} />} */}
        <div className="flex flex-1 items-end justify-end space-x-2">
          {isSearch && (
            <div className="relative">
              <Input
                placeholder={searchInputPlaceHolder}
                value={
                  (table.getColumn('names')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) => {
                  table.getColumn('names')?.setFilterValue(event.target.value);
                  onSearchInput(event);
                }}
                className="h-8 py-5 px-6 w-[150px] lg:w-[250px] rounded-lg"
              />
              <Search className="absolute left-1 top-2.5 text-gray-400 text-xs w-4" />
            </div>
          )}

          {isStatus && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={filterByStatus}
            />
          )}

          {isFilter && (
            <Button className="flex items-center px-4 h-8 py-5 font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
              <span className="material-icons-outlined">
                <ListFilter />
              </span>
              Filters
            </Button>
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 py-8 lg:px-3"
            >
              Reset
              <X size={14} />
            </Button>
          )}

          {navChildren && navChildren(table)}
        </div>
      </div>

      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
