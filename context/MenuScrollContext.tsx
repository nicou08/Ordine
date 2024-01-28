import { useRef, createContext } from "react";
import { ScrollView } from "react-native";

export const MenuScrollContext =
  createContext<React.RefObject<ScrollView> | null>(null);

export default function MenuScrollContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <MenuScrollContext.Provider value={scrollViewRef}>
      {children}
    </MenuScrollContext.Provider>
  );
}
