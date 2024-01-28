import { createContext } from "react";

export const CategoryContext = createContext<{
  [key: string]: number;
}>({});
