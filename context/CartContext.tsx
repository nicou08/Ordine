import React, { createContext, useState } from "react";

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (itemName: string) => void;
  decreaseQuantity: (itemName: string) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      // If item already exists, increment the quantity
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If item doesn't exist, add a new item
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (itemName: string) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.name === itemName
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (itemName: string) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((cartItem) =>
            cartItem.name === itemName && cartItem.quantity > 0
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
          .filter((cartItem) => cartItem.quantity > 0) // Remove items with quantity <= 0
    );
  };

  const removeFromCart = (itemName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== itemName)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// interface CartContextType {
//   cartItems: number;
//   addToCart: () => void;
// }

// export const CartContext = createContext<CartContextType>({
//   cartItems: 0,
//   addToCart: () => {},
// });

// interface CartProviderProps {
//   children: React.ReactNode;
// }

// export const CartProvider = ({ children }: CartProviderProps) => {
//   const [cartItems, setCartItems] = useState(0);

//   const addToCart = () => {
//     setCartItems(cartItems + 1);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
