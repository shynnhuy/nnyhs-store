import { FC } from "react";
import { ProductsTable } from "./products-table";
import SearchProduct from "./search-product";
import { Button } from "@ui/components";
import Link from "next/link";
import Header from "../components/header";

type Props = {};

export const Products: FC<Props> = () => {
  return (
    <main className="flex flex-1 flex-col">
      <Header
        title="Products"
        actions={[
          <Link key="create-category" href="/admin/products/create">
            <Button variant="secondary">Create Category</Button>
          </Link>,
          <Link key="create-product" href="/admin/products/create">
            <Button>Create Product</Button>
          </Link>,
        ]}
      />
      <div className="w-full mb-4">
        <SearchProduct />
      </div>
      <ProductsTable products={[]} />
    </main>
  );
};

export default Products;
