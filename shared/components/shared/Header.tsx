'use client';

import React, { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from './index';
import Image from 'next/image';
import { Button } from '../ui/index';
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

type Props = {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
};

export const Header: FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту. ';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/');
        toast.success(toastMessage);
      }, 500);
    }
  }, []);

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
          <AuthModal
            open={openAuthModal}
            onClose={() => {
              setOpenAuthModal(false);
            }}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
