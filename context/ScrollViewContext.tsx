import { useRef, createContext } from "react";
import { ScrollView } from "react-native";

export const ScrollViewContext =
  createContext<React.RefObject<ScrollView> | null>(null);

export default function ScrollViewContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <ScrollViewContext.Provider value={scrollViewRef}>
      {children}
    </ScrollViewContext.Provider>
  );
}
