'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { ClearButton, ErrorText, RequiredSymbol } from '..';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../..';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  // } = useFormContext();

  const value = watch(name);
  const errorText = errors?.[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  };
  return (
    <div className={cn(className)}>
      {label && (
        <p className="font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Textarea className="h-12 text-md" {...props} {...register(name)} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
