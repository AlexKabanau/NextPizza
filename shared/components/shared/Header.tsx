import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { CartButton, Container, SearchInput } from './index';
import Image from 'next/image';
import { Button } from '../ui/index';
import { UserRound } from 'lucide-react';
import Link from 'next/link';

type Props = {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
};

export const Header: FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкуснее не придумаешь</p>
            </div>
          </div>
        </Link>

        {/* центр */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* правая часть */}
        <div className="flex items-center gap-3">
          <Button variant={'outline'} className="flex items-center gap-3">
            <UserRound size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
