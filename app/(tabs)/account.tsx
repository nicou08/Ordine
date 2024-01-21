import React, { useState } from "react";
import { Text, View, Dimensions, TextInput } from "react-native";

const { width, height } = Dimensions.get("window");

export default function AccountScreen() {
  const [email, setEmail] = useState<string>("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        //justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: width * 0.85,
          alignItems: "center",
          marginTop: 40,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "black",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Email
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: "gray",
          }}
        >
          johnsmith24@gmail.com
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: width * 0.85,
          alignItems: "center",
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "black",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Password
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: "gray",
          }}
        >
          ********
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: width * 0.85,
          alignItems: "center",
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "black",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Phone
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: "gray",
          }}
        >
          +1 (123) 456-7890
        </Text>
      </View>
    </View>
  );
}
