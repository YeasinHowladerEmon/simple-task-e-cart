import { api } from "../../api/apiSlice";

export type IProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
export const ProductApi = api.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "/products"
    })
  })
});

export const { useGetProductsQuery } = ProductApi;
