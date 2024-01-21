import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function SettingsHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: 110,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>
    </View>
  );
}
