import { type Table } from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components";

interface Props<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function StoreTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: Props<TData>) {
  const listPage = Array.from(
    { length: table.getPageCount() },
    (v, k) => k + 1
  );

  return (
    <Pagination className="m-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => table.previousPage()} />
        </PaginationItem>

        {listPage.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={table.getState().pagination.pageIndex + 1 === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" onClick={() => table.nextPage()} />
        </PaginationItem>

        <PaginationItem>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
