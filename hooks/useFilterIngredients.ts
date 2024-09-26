import { ingredients } from './../prisma/constants';
import { Api } from '@/services/apiClient';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

type ReturnProps = {
  ingredients: Ingredient[];
  loading: boolean;
};

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGetIngredients() {
      try {
        setLoading(true);
        const response = await Api.ingredients.getAllIngredients();
        setIngredients(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchGetIngredients();

    // Api.ingredients
    // .getAll()
    // .then((data) => {
    //   setItems(data)
    // })
    // .catch((error) => console.log(error);
    // )
  }, []);
  return { ingredients, loading };
};
