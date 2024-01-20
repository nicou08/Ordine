import React, { useState } from "react";
import {
  router,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { sampleRestaurants } from "../../constants/SampleRestaurants";

export default function RestaurantHeader() {
  const searchParams = useLocalSearchParams();

  // Get name and rating from ID
  const restaurantName = sampleRestaurants[0].name;
  const restaurantRating = sampleRestaurants[0].rating;

  return (
    <View
      style={{
        height: 160,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 10,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={{ width: 30, marginBottom: 15 }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            //backgroundColor: "pink",
          }}
        >
          <Text style={{ color: "black", fontSize: 37, fontWeight: "bold" }}>
            {restaurantName}
          </Text>
          <View style={{ justifyContent: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="star"
                size={22}
                color="#CE3535"
                style={{ paddingTop: 3, paddingRight: 2 }}
              />
              <Text
                style={{ color: "#CE3535", fontSize: 25, fontWeight: "bold" }}
              >
                {restaurantRating}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
