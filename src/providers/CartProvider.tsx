import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
});

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, incremenet quantity
    // id should be dynamic

    const newCartItem: CartItem = {
      id: "1",
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  console.log(items);

  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
