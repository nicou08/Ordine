import React from "react";
import { View, Text, Pressable, Dimensions, Image } from "react-native";
import { router } from "expo-router";

export default function TermsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Terms of Use!</Text>
    </View>
  );
}
