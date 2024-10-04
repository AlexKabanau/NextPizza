// import axios from 'axios';
import { ApiRoutes } from './constatnts';
import { axiosInstance } from './instance';
import { Ingredient } from '@prisma/client';

export const getAllIngredients = async () => {
  // console.log(query);
  // debugger;
  // axios.get
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
};
