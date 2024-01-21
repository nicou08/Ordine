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
        backgroundColor: "white",
        height: height * 0.43,
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
          backgroundColor: "white",
          paddingTop: 55,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
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
        <View style={{ flex: 1, alignItems: "center", paddingTop: 5 }}>
          <Image
            source={require("../../assets/images/ProfilePlaceholder.jpg")}
            style={{
              width: width * 0.35,
              height: 131,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "pink",
              borderRadius: 100,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#CE3535",
              paddingTop: 10,
            }}
          >
            John Smith
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={16} color="black" />
            <Text style={{ paddingLeft: 5, color: "black" }}>
              123 Fake Street, Fake City
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 12,
              width: width * 0.6,
              backgroundColor: "white",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "600" }}>3</Text>
              <Text>Favourites</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "600" }}>3</Text>
              <Text>Reservations</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
