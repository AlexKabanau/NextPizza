import React from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount, paymentUrl }) => (
  <div>
    <h1>Заказ номер, {orderId}!</h1>
    <p>Оптатите заказ на сумму ${totalAmount}</p>
    <p>
      Перейдите <a href={paymentUrl}> по этой ссылке</a> для оплаты заказа.
    </p>
  </div>
);
