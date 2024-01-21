import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function SettingsHeader() {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 110,
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={30} color="#8c8c8c" />
        </Pressable>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Settings</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>
    </View>
  );
}
