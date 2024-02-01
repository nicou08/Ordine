import React, { createContext, useState, useContext } from "react";

interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
  recentSearches: string[];
  addRecentSearch: (search: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => {},
  recentSearches: [],
  addRecentSearch: () => {},
});

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const addRecentSearch = (search: string) => {
    setRecentSearches((prevSearches) => [search, ...prevSearches]);
  };

  return (
    <SearchContext.Provider
      value={{ search, setSearch, recentSearches, addRecentSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// KEEP THIS IN MIND. GOOD PRACTICE

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
