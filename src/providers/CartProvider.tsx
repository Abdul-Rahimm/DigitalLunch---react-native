import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, number: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

// function max(a: number, b: number) {
//   if (a > b) return a;
//   else return b;
// }

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    // if already in cart, increment quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(), //now update can be done. quantity increase
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([...items, newCartItem]);
  };

  //this is linked to the plus and minus buttons on the Cart page
  // find the object with that id and update it
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
  };

  //   console.log(items);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
