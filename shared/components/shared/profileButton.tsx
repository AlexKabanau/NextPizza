import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { useSession } from 'next-auth/react';
import { Button } from '..';
import { CircleUser, UserRound } from 'lucide-react';
import Link from 'next/link';

type Props = {
  onClickSignIn?: () => void;
  className?: string;
};

export const ProfileButton: FC<Props> = ({ className, onClickSignIn }) => {
  const { data: session } = useSession();
  // console.log(session, 'session');

  return (
    <div className={cn(className)}>
      {!session ? (
        <Button onClick={onClickSignIn} variant={'outline'} className="flex items-center gap-3">
          <UserRound size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant={'secondary'} className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
