import { PaymentData } from './../../@types/yookassa';
import axios from 'axios';

type PropsType = {
  description: string;
  orderId: number;
  amount: number;
};

export async function createPayment(details: PropsType) {
  if (!process.env.YOOKASSA_API_KEY) {
    throw new Error('Укажите ключ YOOKASSA_API_KEY');
  }
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount,
        currency: 'RUB',
      },
      capture: true,
      descroption: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3000/?paid',
        // return_url: process.env.YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_API_KEY,
        password: '',
      },
      headers: {
        // 'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}
