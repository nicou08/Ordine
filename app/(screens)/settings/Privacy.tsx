import React from "react";
import { View, Text, Pressable, Dimensions, Image } from "react-native";
import { router } from "expo-router";

export default function PrivacyScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Privacy!</Text>
    </View>
  );
}
