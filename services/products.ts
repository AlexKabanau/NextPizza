// import axios from 'axios';
import { ApiRoutes } from './constatnts';
import { axiosInstance } from './instance';
import { Product } from '@prisma/client';

export const search = async (query: string) => {
  // console.log(query);
  // debugger;
  // axios.get
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
  });

  return data;
};
