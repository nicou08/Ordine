import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  router,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function RestaurantScreen() {
  const pathname = usePathname();
  const searchParams = useLocalSearchParams();
  const { globalSearchParams } = useGlobalSearchParams();
  console.log("searchParams: ", searchParams.restaurant);
  console.log("searchParamsname: ", searchParams);
  console.log(typeof searchParams.restaurant);

  return (
    <View>
      <Text>Welcome! {pathname} </Text>
      <Text>
        searchParams: {searchParams.restaurant} type:{" "}
        {typeof searchParams.restaurant}{" "}
      </Text>
      <Text>globalSearchParams: {globalSearchParams} </Text>
    </View>
  );
}
