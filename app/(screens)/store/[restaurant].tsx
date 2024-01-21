import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import {
  router,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Octicons,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";

import { sampleRestaurants } from "../../../constants/SampleRestaurants";

const width = Dimensions.get("window").width;

export default function RestaurantScreen() {
  // Images
  const images = [];

  // Handle Heart Press
  const [heartFilled, setHeartFilled] = useState(false);

  const handleHeartPress = () => {
    setHeartFilled(!heartFilled);
  };

  const pathname = usePathname();
  const searchParams = useLocalSearchParams();
  const { globalSearchParams } = useGlobalSearchParams();
  console.log("searchParams: ", searchParams.restaurant);
  console.log("searchParamsname: ", searchParams);
  console.log(typeof searchParams.restaurant);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Carousel
        loop
        width={width}
        height={width * 0.6}
        autoPlay={false}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={{
              //flex: 1,
              width: width,
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <Image
              source={require("../../../assets/images/sushi/mainSushi.jpg")}
              style={{
                width: width,

                resizeMode: "cover",
              }}
            />
          </View>
        )}
      />
      <View style={{ backgroundColor: "white", paddingTop: 20 }}>
        {/*************************************/}
        {/***********  RED BAR INFO ***********/}
        {/*************************************/}
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
          }}
        >
          <View style={{ width: 10, backgroundColor: "#CE3535" }} />
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: 10, flexDirection: "row" }}>
              <Ionicons name="location-outline" size={16} color="#8c8c8c" />
              <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
                123 Fake Street, Fake City
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                flexDirection: "row",
                paddingTop: 2,
                paddingBottom: 2,
              }}
            >
              <MaterialIcons name="hourglass-empty" size={16} color="#8c8c8c" />
              <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
                15~25 min
              </Text>
              <View style={{ width: 10 }}></View>
              <MaterialCommunityIcons
                name="currency-usd"
                size={16}
                color="#8c8c8c"
              />
              <Text style={{ paddingLeft: 0, color: "#8c8c8c" }}>
                19.99~79.99
              </Text>

              <View style={{ width: 10 }}></View>
              <MaterialCommunityIcons
                name="map-outline"
                size={16}
                color="#8c8c8c"
              />
              <Text style={{ paddingLeft: 0, color: "#8c8c8c" }}>
                24 min away
              </Text>
            </View>
            <View style={{ paddingLeft: 10, flexDirection: "row" }}>
              <Ionicons name="link" size={16} color="#8c8c8c" />
              <Text style={{ paddingLeft: 5, color: "#8c8c8c" }}>
                somewebsite.com
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingRight: 20,
              justifyContent: "center",
            }}
          >
            <Pressable onPress={handleHeartPress}>
              <AntDesign
                name={heartFilled ? "heart" : "hearto"}
                size={30}
                color="#CE3535"
              />
            </Pressable>
          </View>
        </View>
        {/****************************/}
        {/*********** TAGS ***********/}
        {/****************************/}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sampleRestaurants[0].tags}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 15,
            paddingBottom: 20,
          }}
          renderItem={({ item: tag }) => (
            <View
              style={{
                backgroundColor: "#f0f0f0",
                marginRight: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 10,
              }}
            >
              <Text>{tag}</Text>
            </View>
          )}
        />

        {/*****************************/}
        {/***********  MENU ***********/}
        {/*****************************/}
        <View
          style={{
            backgroundColor: "lightgreen",
            width: width,
            flex: 1,
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "pink",
              alignSelf: "flex-start",
              flexDirection: "row",
            }}
          >
            <Text
              style={{ fontSize: 17, color: "#8c8c8c", fontWeight: "bold" }}
            >
              TRENDING DISHES{" "}
            </Text>
            <View style={{ justifyContent: "center" }}>
              <Entypo name="chevron-right" size={17} color="#8c8c8c" />
            </View>
          </Pressable>
        </View>

        {/***************************************/}
        {/***********  BUSINESS HOURS ***********/}
        {/***************************************/}
        <View>
          <Text>BUSINESS HOURS</Text>
        </View>

        {/*************************************/}
        {/***********  USER RATINGS ***********/}
        {/*************************************/}
        <View>
          <Text>USER RATINGS</Text>
        </View>
        <Text style={{ paddingTop: 40 }}>Welcome! {pathname} </Text>
        <Text>
          searchParams: {searchParams.restaurant} type:{" "}
          {typeof searchParams.restaurant}{" "}
        </Text>
        <Text>globalSearchParams: {globalSearchParams} </Text>
      </View>
    </ScrollView>
  );
}
