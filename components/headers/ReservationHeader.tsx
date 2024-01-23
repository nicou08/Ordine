import React, { useState } from "react";
import { View, Text, TextInput, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ReservationHeader() {
  const [search, setSearch] = useState("");
  return (
    <View
      style={{
        height: 105,
        backgroundColor: "white",
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
          //backgroundColor: "pink",
          marginTop: 50,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ color: "black", fontSize: 32, fontWeight: "bold" }}>
            Reservations
          </Text>
          <View></View>
        </View>
      </View>
    </View>
  );
}
