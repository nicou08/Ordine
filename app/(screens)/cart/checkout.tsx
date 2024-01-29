import React, { useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Platform,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CartContext } from "../../../context/CartContext";
import { supabase } from "../../../utils/supabase";

const width = Dimensions.get("window").width;

/***********************************************/
/*  Post Preordered items to Reservation Table */
/***********************************************/
interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}
async function postPreorderedItems({
  cartItems,
  reservation_id,
  tax_price,
  total_price,
}: {
  cartItems: CartItem[];
  reservation_id: string;
  tax_price: number;
  total_price: number;
}) {
  console.log("Received Cart Items: ", cartItems);
  console.log("Received Reservation ID: ", reservation_id);
  if (reservation_id) {
    const { data, error } = await supabase
      .from("Reservation Table")
      .update({
        preordered_items: cartItems,
        price_of_tax: tax_price,
        price_of_items: total_price,
      })
      .eq("id", reservation_id);
    if (error) {
      console.log("Error updating Reservation table: ", error);
    } else {
      console.log("Successfully Preordered");
    }
  }
}

export default function CheckoutScreen() {
  const searchParams = useLocalSearchParams();

  const { clearCart, getTotalPrice, cartItems } = useContext(CartContext);

  // Upload items to preodered items in Reservation table
  const handlePayment = () => {
    const totalPrice = (getTotalPrice() * 1.13).toFixed(2);
    const tax = (getTotalPrice() * 0.13).toFixed(2);
    postPreorderedItems({
      cartItems,
      reservation_id: searchParams.reservation_id as string,
      tax_price: Number(tax),
      total_price: Number(totalPrice),
    });
    clearCart();
    router.replace("/reservations");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "gray", fontSize: 15 }}>
        Which payment method do you want to use?
      </Text>
      <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => handlePayment()}
            style={{
              width: width * 0.4,
              paddingTop: 30,
              paddingBottom: 30,
              backgroundColor: "#e8e8e8",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="paypal" size={40} color="black" />
          </TouchableOpacity>
          <View style={{ width: 20 }}></View>
          <TouchableOpacity
            onPress={() => handlePayment()}
            style={{
              width: width * 0.4,
              paddingTop: 20,
              paddingBottom: 20,
              backgroundColor: "#e8e8e8",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="apple-pay" size={60} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }}></View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => handlePayment()}
            style={{
              width: width * 0.4,
              paddingTop: 30,
              paddingBottom: 30,
              backgroundColor: "#e8e8e8",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="credit-card" size={25} color="black" />
            <Text style={{ fontSize: 15 }}> CREDIT</Text>
          </TouchableOpacity>
          <View style={{ width: 20 }}></View>
          <TouchableOpacity
            onPress={() => handlePayment()}
            style={{
              width: width * 0.4,
              paddingTop: 30,
              paddingBottom: 30,
              backgroundColor: "#e8e8e8",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="credit-card" size={25} color="black" />
            <Text style={{ fontSize: 15 }}> DEBIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
