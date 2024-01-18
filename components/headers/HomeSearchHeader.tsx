import React, { useState } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function HomeSearchHeader({ title }: { title: string }) {
  const [search, setSearch] = useState("");
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
        <TextInput
          style={{
            height: 40,
            width: "100%",
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            paddingLeft: 20,
            paddingRight: 20,
          }}
          placeholder={
            title === "Search"
              ? "Search Restaurants or Categories"
              : "10 Brentwood Common, NW"
          }
          placeholderTextColor={"gray"}
          textContentType="none"
          returnKeyType="search"
          value={search}
          onChangeText={setSearch}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
}
