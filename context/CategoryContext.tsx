import React, { createContext, useState } from "react";

interface CategoryPositionContextType {
  positions: {
    Appetizers: number;
    MainDishes: number;
    Desserts: number;
    Drinks: number;
    AlcoholicDrinks: number;
  };
  setCategoryPositions: React.Dispatch<
    React.SetStateAction<CategoryPositionContextType["positions"]>
  >;
}

export const CategoryPositionContext = createContext<
  CategoryPositionContextType | undefined
>(undefined);

export const CategoryPositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [positions, setCategoryPositions] = useState({
    Appetizers: 0,
    MainDishes: 0,
    Desserts: 0,
    Drinks: 0,
    AlcoholicDrinks: 0,
  });

  return (
    <CategoryPositionContext.Provider
      value={{ positions, setCategoryPositions }}
    >
      {children}
    </CategoryPositionContext.Provider>
  );
};
