import React from 'react';

interface Props {
  code: string;
}
export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <h1>Код подтверждения, {code}!</h1>
    <p>
      Перейдите <a href={`http://localhost:3000/api/auth/verify?code=${code}`}> по этой ссылке</a>{' '}
      для верификации.
    </p>
  </div>
);
