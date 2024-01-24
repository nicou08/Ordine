import React, { useState, useEffect } from "react";
import {
  router,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { View, Text, Platform, Pressable } from "react-native";
import { supabase } from "../../utils/supabase";
import { sampleRestaurants } from "../../constants/SampleRestaurants";

/********************************************/
/*  Get restaurant name and rating from ID  */
/********************************************/
async function fetchRestaurantNameAndRating(restaurantID: string) {
  let { data, error } = await supabase
    .from("Restaurant Table")
    .select("name, rating")
    .eq("id", restaurantID)
    .single();

  if (error) {
    console.log("error", error);
    return null;
  } else {
    //console.log("HEADER NAME AND RATING", data);
    return data;
  }
}

export default function RestaurantHeader() {
  const searchParams = useLocalSearchParams();
  //console.log("HEADER PARAMS", searchParams.restaurant);

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantRating, setRestaurantRating] = useState(0);

  // Get name and rating from ID
  useEffect(() => {
    fetchRestaurantNameAndRating(searchParams.restaurant as string).then(
      (data) => {
        if (data) {
          setRestaurantName(data.name);
          setRestaurantRating(data.rating);
        }
      }
    );
  }, []);

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
          style={{ width: 30, marginBottom: 27 }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            //backgroundColor: "pink",
            height: Platform.OS === "android" ? 40 : 34,
          }}
        >
          <Text
            style={{
              color: "black",
              //fontSize: restaurantName.length > 10 ? 29 : 35,
              fontSize: 29,
              fontWeight: "bold",
            }}
          >
            {restaurantName}
          </Text>
          <View style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                name="star"
                size={22}
                color="#CE3535"
                style={{
                  paddingTop: Platform.OS === "android" ? 5 : 3,
                  paddingRight: 2,
                }}
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
