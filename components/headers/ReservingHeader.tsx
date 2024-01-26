import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import {
  router,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

export default function ReservingHeader({ title }: { title: string }) {
  const searchParams = useLocalSearchParams();
  //console.log("RESERVING HEADER PARAMS", searchParams);

  return (
    <View
      style={{
        height: Platform.OS === "android" ? 210 : 200,
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
        {/***********************************/}
        {/*** HEADER TITLE AND BACK ARROW ***/}
        {/***********************************/}
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: Platform.OS === "android" ? 19 : 24,
          }}
        >
          <Pressable onPress={() => router.back()} style={{ width: 30 }}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </Pressable>
          <Text style={{ fontSize: 19, fontWeight: "bold", paddingTop: 4 }}>
            {title}
          </Text>
          <View style={{ width: 30 }}></View>
        </View>

        {/***********************/}
        {/*** RESTAURANT INFO ***/}
        {/***********************/}
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#CE3535" }}>
            {searchParams.name}
          </Text>
          <View
            style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 5 }}
          >
            <Ionicons name="location-outline" size={16} color="#8c8c8c" />
            <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
              {searchParams?.location}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="map-outline"
              size={16}
              color="#8c8c8c"
            />
            <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
              {searchParams?.distance} away
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
