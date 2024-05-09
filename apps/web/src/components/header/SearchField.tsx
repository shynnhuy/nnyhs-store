"use client";
import { useGetCategories } from "@/queries/products";
import { Input, Select } from "antd";
import Compact from "antd/es/space/Compact";

const SearchField = () => {
  const { data } = useGetCategories();

  return (
    <Compact className="w-full max-w-[670px] h-[44px]">
      <Input className="search-query" placeholder="Search and hit enter..." />
      <Select
        placeholder="All Categories"
        options={(data ? data.result : []).map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        className="select-categories"
      />
    </Compact>
  );
};

export default SearchField;
