import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from '.';

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  // pizzaSize?: PizzaSize | null;
  // pizzaType?: PizzaType | null;

  ingredients: Array<{ name: string; price: number }>;
};

interface RetunPropsType {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): RetunPropsType => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));

  return {
    items,
    totalAmount: data.totalAmount,
  };
};