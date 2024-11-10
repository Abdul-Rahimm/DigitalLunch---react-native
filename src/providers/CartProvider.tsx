import { createContext, useContext } from "react";

const CartContext = createContext({});

export default function CartProvider({ children }) {
  return (
    <CartContext.Provider value={{ items: [1], onAddItem: () => {} }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
