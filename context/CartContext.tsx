import React, { createContext, useState } from "react";

interface CartContextType {
  cartItems: number;
  addToCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: 0,
  addToCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState(0);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
