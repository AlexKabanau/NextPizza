import { useEffect, useRef } from 'react';
import { UseQueryFiltersPropsTypes } from './useFilters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: UseQueryFiltersPropsTypes) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
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
    }

    isMounted.current = true;
  }, [filters, router]);
};
