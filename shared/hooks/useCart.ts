import { useEffect } from 'react';
import { useCartStore } from '../store';
import { CartStateItem } from '../lib/getCartDetails';
import { CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  // fetchCartItems;
  loading: boolean;
  addCartItem: (value: CreateCartItemValues) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems();
    // console.log(items);
    // console.log(totalAmount);
  }, []);

  return cartState;
};
