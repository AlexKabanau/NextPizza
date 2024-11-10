import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { formLoginSchema, FormLoginValuesType } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, Title } from '../../..';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
  className?: string;
  onClose?: VoidFunction;
};

export const LoginForm: FC<Props> = ({ className, onClose }) => {
  const form = useForm<FormLoginValuesType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormLoginValuesType) => {
    try {
      // console.log(data);
      // const resp = await signIn('credentials', {
      //   ...data,
      //   redirect: false,
      // });

      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      // console.log(resp);
      if (!resp?.ok) {
        throw Error();
      }
      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });
      onClose?.();
    } catch (error) {
      console.log('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в систему" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-bold" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
