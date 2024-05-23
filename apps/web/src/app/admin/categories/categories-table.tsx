"use client";
import { ProductAPI, TCategory } from "@/api/products";
import StoreTable from "@/components/table/table";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner } from "@ui/components";
import { formatDate } from "date-fns";
import { FC, useMemo, useState } from "react";

type Props = {
  categories: TCategory[];
};

const CategoriesTable: FC<Props> = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories", pagination],
    queryFn: () =>
      ProductAPI.getCategories({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      }),
  });

  const columns = useMemo<ColumnDef<TCategory>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: () => <span>ID</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Category name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "code",
        header: () => "Category code",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "createdAt",
        header: () => "Date created",
        footer: (props) => props.column.id,
        cell: (info) => formatDate(info.getValue() as string, "dd/MM/yyyy"),
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: categories?.result ?? [],
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    rowCount: categories?.meta?.totalCount,
    manualPagination: true,
    state: {
      pagination,
    },
  });

  return (
    <Spinner show={isLoading}>
      <StoreTable table={table} />
    </Spinner>
  );
};

export default CategoriesTable;
