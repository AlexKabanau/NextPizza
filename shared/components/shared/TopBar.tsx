'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CartButton, Categories, Container, SortPopup } from './index';
import { Category } from '@prisma/client';

export type Cat = {
  name: string;
};
type Props = {
  categories: Category[];
  // categories: Cat[];
  className?: string;
};

export const TopBar: FC<Props> = ({ categories, className }) => {
  const [cartVisible, setCartVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setCartVisible(true);
      } else {
        setCartVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-black/5 z-10', className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <div className="flex items-center">
          <SortPopup />
          <CartButton
            className={cn(
              'transition-all',
              !cartVisible ? 'invisible w-0 p-0 opacity-0' : 'visible ml-5 opacity-100',
            )}
          />
        </div>
      </Container>
    </div>
  );
};
