'use client';

import React, { FC, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button, Dialog, DialogContent } from '@/shared/components/ui';
import { signIn } from 'next-auth/react';
import { LoginForm } from '.';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AuthModal: FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? <LoginForm onClose={handleClose} /> : <h1>Регистрация</h1>}

        <hr />
        <div className="flex gap-2">
          <Button
            variant={'secondary'}
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              className="w-6 h-6"
              alt="GitHub"
            />
            GitHub
          </Button>
          <Button
            variant={'secondary'}
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              className="w-6 h-6"
              alt="Google"
            />
            Google
          </Button>
        </div>
        <Button variant={'outline'} onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
