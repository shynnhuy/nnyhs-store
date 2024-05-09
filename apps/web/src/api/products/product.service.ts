import { APIService } from "..";
import { TCategory, TGetCategories } from "./product.type";

export const ProductAPI = {
  getCategories: async (params: TGetCategories) => {
    const res = await APIService.get<TCategory[]>("/products/category");
    return res.data;
  },
};
