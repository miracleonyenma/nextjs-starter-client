// ./components/Table.tsx

/**
 * Reusable table component
 */

import React, { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDownIcon, ArrowUpIcon } from "@hugeicons/core-free-icons";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import SearchInput from "./SearchInput";
import { Meta } from "@/types/gql/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

interface Column<T> {
  key: string;
  header: string | ReactNode;
  cell: (item: T) => ReactNode;
  sortable?: boolean;
}

interface ReusableTableProps<T> {
  columns: Column<Maybe<T>>[];
  data: Maybe<Maybe<T>[]> | undefined;
  meta?: Maybe<Meta> | undefined;
  isLoading?: boolean;
  sortConfig?: {
    field: string | null;
    direction: "asc" | "desc";
  };
  onSort?: (field: string) => void;
  onPageChange?: (page: number) => void;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  emptyMessage?: string;
  showSearch?: boolean;
  showPagination?: boolean;
}

function ReusableTable<T>({
  columns,
  data,
  meta,
  isLoading = false,
  sortConfig,
  onSort,
  onPageChange,
  onSearch,
  searchPlaceholder = "Search...",
  emptyMessage = "No data found.",
  showSearch = true,
  showPagination = true,
}: ReusableTableProps<T>) {
  const renderSortIcon = (field: string) => {
    if (!sortConfig || sortConfig.field !== field) return null;
    return (
      <HugeiconsIcon
        icon={ArrowUpIcon}
        altIcon={ArrowDownIcon}
        showAlt={sortConfig.direction === "asc"}
        className="icon"
        color="currentColor"
        strokeWidth={2}
      />
    );
  };

  return (
    <div className="space-y-4">
      {showSearch && onSearch && (
        <div className="flex items-center justify-end">
          <SearchInput onSearch={onSearch} placeholder={searchPlaceholder} />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.sortable && onSort ? "cursor-pointer" : ""}
                  onClick={() => {
                    if (column.sortable && onSort) {
                      onSort(column.key);
                    }
                  }}
                >
                  {typeof column.header === "string" ? (
                    <div className="flex items-center">
                      {column.header}{" "}
                      {column.sortable && renderSortIcon(column.key)}
                    </div>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center"
                >
                  <div className="flex w-full items-center justify-center">
                    <Loader loading />
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{column.cell(item)}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && meta && onPageChange && (
        <div className="flex w-full items-center justify-between">
          <div className="text-muted-foreground shrink-0 text-sm">
            Showing {data?.length} of {meta.total} items
          </div>
          <Pagination
            currentPage={meta.page || 1}
            totalPages={meta.pages || 1}
            hasPrevPage={!!meta.hasPrevPage}
            hasNextPage={!!meta.hasNextPage}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default ReusableTable;
