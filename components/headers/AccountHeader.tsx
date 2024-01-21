import React, { useState } from "react";
import { View, Text, Pressable, Dimensions, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons, Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function AccountHeader() {
  const [name, setName] = useState<string>("John Doe");
  const [location, setLocation] = useState<string>("New York, NY");
  const [numberFavorites, setNumberFavorites] = useState<number>(0);
  const [numberReservations, setReservations] = useState<number>(0);

  return (
    <View
      style={{
        height: height * 0.4,
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
          backgroundColor: "lightsteelblue",
          paddingTop: 60,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "lightgreen",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: 24 }} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Account</Text>
          <Pressable onPress={() => router.push({ pathname: "/settings" })}>
            <Octicons name="gear" size={24} color="#8c8c8c" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
