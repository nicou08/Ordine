import React, { useContext } from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Image,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { CartContext } from "../../../context/CartContext";
import { supabase } from "../../../utils/supabase";

const width = Dimensions.get("window").width;

export default function CartScreen() {
  const searchParams = useLocalSearchParams();
  console.log("HORSE", searchParams?.reservation_id);

  const { cartItems, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 60,
        paddingTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#8c8c8c",
          fontWeight: "bold",
          paddingBottom: 10,
        }}
      >
        ITEMS {totalItemsInCart}
      </Text>
      {cartItems.map((item) => (
        <View
          key={item.name}
          style={{ flexDirection: "row", marginBottom: 20 }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 70, height: 70, borderRadius: 100 }}
          />
          <View
            style={{
              paddingLeft: 20,
              flex: 1,
              //backgroundColor: "pink",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>${item.price}</Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  style={{
                    backgroundColor: "#dbdbdb",
                    borderRadius: 100,
                    marginRight: 15,
                  }}
                  onPress={() => decreaseQuantity(item.name)}
                >
                  <Entypo name="minus" size={25} color="black" />
                </Pressable>
                <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                <Pressable
                  style={{
                    backgroundColor: "#dbdbdb",
                    borderRadius: 100,
                    marginLeft: 15,
                  }}
                  onPress={() => increaseQuantity(item.name)}
                >
                  <Entypo name="plus" size={25} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      ))}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: width,
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "#f5f5f5",
          //borderTopWidth: 0.2,
        }}
      >
        <Pressable
          //onPress={() => router.push("/cart/checkout")}
          onPress={() =>
            router.push({
              pathname: "/cart/checkout",
              params: {
                reservation_id: searchParams?.reservation_id as string,
              },
            })
          }
          // onPress={() =>
          //   router.push({
          //     pathname: "/reserving",
          //     params: {
          //       restaurantID: restaurantInfo?.id as string,
          //       name: restaurantInfo?.name as string,
          //       location: restaurantInfo?.address as string,
          //       distance: restaurantInfo?.distance_away as string,
          //     },
          //   })
          // }
          style={{
            backgroundColor: "#CE3535",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}>
            Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
