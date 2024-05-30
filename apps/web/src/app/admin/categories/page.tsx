import { Fragment } from "react";
import Header from "../components/header";
import Link from "next/link";
import { Button } from "@ui/components";
import CategoriesTable from "./categories-table";

const CategoriesPage = () => {
  return (
    <Fragment>
      <Header
        title="Categories"
        actions={[
          <Link key="create-category" href="/admin/categories/create">
            <Button variant="default">Create Category</Button>
          </Link>,
        ]}
      />
      <CategoriesTable categories={[]} />
    </Fragment>
  );
};

export default CategoriesPage;
