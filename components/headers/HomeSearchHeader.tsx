import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";
import { SearchContext, useSearch } from "../../context/SearchContext";

const { width, height } = Dimensions.get("window");

export default function HomeSearchHeader({ title }: { title: string }) {
  const [currentSearch, setCurrentSearch] = useState("");

  // const { search, setSearch } = useContext(SearchContext); // this is the same as the line below
  const { search, setSearch } = useSearch();

  const handleSearch = () => {
    console.log("searching", currentSearch);
    setSearch(currentSearch);
  };

  return (
    <View
      style={{
        height: 150,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          //backgroundColor: "pink",
          marginTop: 50,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ color: "black", fontSize: 32, fontWeight: "bold" }}>
            {title}
          </Text>
          <View></View>
        </View>
        <View
          style={{
            height: 40,
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            // paddingLeft: 20,
            // paddingRight: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              height: 40,
              //width: "80%",
              flex: 1,
              backgroundColor: "#F1F1F1",
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 10,
            }}
            placeholder={
              title === "Search"
                ? "Search Restaurants or Categories"
                : "10 Brentwood Common, NW"
            }
            placeholderTextColor={"gray"}
            textContentType="none"
            returnKeyType="done"
            value={currentSearch}
            onChangeText={setCurrentSearch}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={handleSearch}
            style={{
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
