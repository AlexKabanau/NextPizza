import { useEffect } from 'react';
import { UseQueryFiltersPropsTypes } from './useFilters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: UseQueryFiltersPropsTypes) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const queryString = qs.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [filters, router]);
};
