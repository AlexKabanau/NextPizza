import { create } from 'zustand';
import { Api } from '../services/apiClient';
import { getCartDetails } from '../lib';
import { CartStateItem } from '../lib/getCartDetails';

export interface CartStateType {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  fetchCartItems: () => Promise<void>; //получение товара из корзины
  updateItemQuantity: (id: number, quantity: number) => Promise<void>; // запрос на обновление
  addCartItem: (values: any) => Promise<void>; //запрос на добавление товара в корзину
  removeCartItem: (id: number) => Promise<void>; //запрос на удаление товара из корзины
}

export const useCartStore = create<CartStateType>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
    }
  },
  removeCartItem: async (id: number) => {},
  addCartItem: async (values: any) => {},
}));
