"use client";
import { ProductAPI } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => ProductAPI.getCategories({ page: 1, limit: 100 }),
  });
};
