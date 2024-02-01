import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { SearchContext, useSearch } from "../../context/SearchContext";

const { width, height } = Dimensions.get("window");

interface SearchResults {
  id: string;
  name: string;
  restaurant_image: string;
  tags: string[];
}

/**
 * 'getSearchResults' is a function that gets the search results
 *
 * @param search
 * @returns data
 */
async function getSearchResults(search: string) {
  console.log("searching for: ", search);
  const tagSearch = `${search.charAt(0).toUpperCase() + search.slice(1)}`;
  console.log(`%${search}%`);

  const { data, error } = await supabase
    .from("Restaurant Table")
    .select("id,name,restaurant_image,tags")
    .or(`name.ilike.%${search}%,tags.cs.{${tagSearch}}`);
  // .contains("tags", [tagSearch])
  // .ilike("name", `%${search}%`);

  if (error) {
    console.log("Error searching: ", error);
    return null;
  } else {
    return data;
  }
}

/**
 * 'SearchScreen' is a component that displays the search screen
 *
 * @returns search screen
 */
export default function SearchScreen() {
  const { search } = useSearch();
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);

  /**
   * Get the search results
   */
  useEffect(() => {
    console.log("SEARCHING: ", search);
    if (search && search.length > 0) {
      getSearchResults(search).then((data) => {
        if (data) {
          setSearchResults(data);
          console.log("RESULTS: ", data);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [search]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        {searchResults.length > 0 ? (
          <View
            style={{
              flex: 1,
              paddingTop: 20,
              alignItems: "center",
            }}
          >
            <View style={{ width: width * 0.9, backgroundColor: "#f5f5f5" }}>
              {searchResults.map((result, index) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/store/:restaurant",
                      params: { restaurant: result.id },
                    })
                  }
                  key={index}
                >
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 10,
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={{ uri: result.restaurant_image }}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                      }}
                    />
                    <View style={{ paddingLeft: 20, flex: 1 }}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {result.name}
                      </Text>
                      {/* {result.tags.map((tag, index) => (
                        <Text key={index}>{tag}</Text>
                      ))} */}
                      <View
                        style={{
                          paddingTop: 10,
                          flexDirection: "row",
                          flexWrap: "wrap",
                          //backgroundColor: "lightgreen",
                        }}
                      >
                        {result.tags.map((tag, index) => (
                          <View
                            style={{
                              width: "50%",
                              padding: 5,
                              //backgroundColor: "pink",
                            }}
                            key={index}
                          >
                            <View
                              style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 3,
                                paddingBottom: 3,
                                backgroundColor: "#f0f0f0",
                                borderRadius: 10,
                              }}
                            >
                              <Text>{tag}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                  <View style={{ height: 20 }}></View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#8c8c8c", fontSize: 18 }}>
              No search results
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
