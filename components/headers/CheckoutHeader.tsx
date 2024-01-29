import React, { useContext } from "react";
import { View, Text, Dimensions, Pressable, Platform } from "react-native";
import { router } from "expo-router";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CartContext } from "../../context/CartContext";

export default function CheckoutHeader() {
  const { getTotalPrice } = useContext(CartContext);
  return (
    <View
      style={{
        height: Platform.OS === "android" ? 230 : 220,
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
          backgroundColor: "white",
          marginTop: 50,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {/*************************************/}
        {/*** HEADER TITLE AND CLOSE BUTTON ***/}
        {/*************************************/}
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: Platform.OS === "android" ? 30 : 30,
          }}
        >
          <Pressable onPress={() => router.back()} style={{ width: 30 }}>
            <AntDesign name="close" size={30} color="black" />
          </Pressable>
          <Text style={{ fontSize: 19, fontWeight: "bold", paddingTop: 4 }}>
            Payment
          </Text>
          <View style={{ width: 30 }}></View>
        </View>

        {/*******************/}
        {/*** TOTAL PRICE ***/}
        {/*******************/}
        <View
          style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}
        >
          <Text style={{ color: "#8c8c8c", fontSize: 15, fontWeight: "500" }}>
            TOTAL PRICE
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={50}
              height={50}
              width={45}
              color="#CE3535"
            />
            <Text style={{ color: "#CE3535", fontSize: 50, fontWeight: "500" }}>
              {(getTotalPrice() * 1.13).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
