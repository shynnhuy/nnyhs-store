import { FC } from "react";
import { ProductsTable } from "./products-table";
import SearchProduct from "./search-product";
import { Button } from "@ui/components";
import Link from "next/link";

type Props = {};

export const Products: FC<Props> = () => {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
        <Link href="/admin/products/create">
          <Button>Create Product</Button>
        </Link>
      </div>
      <div className="w-full mb-4">
        <SearchProduct />
      </div>
      <ProductsTable products={[]} />
    </main>
  );
};

export default Products;
