'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';

import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
  className?: string;
}

export const AddressInput: React.FC<Props> = ({ onChange, className }) => {
  return (
    <AddressSuggestions
      // hintClassName={className}
      token="6247962c13c3170c759243f3eba0a557519ea198"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
