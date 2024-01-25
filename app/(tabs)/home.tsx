import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Pressable,
  StatusBar,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { supabase } from "../../utils/supabase";
import { sampleRestaurants } from "../../constants/SampleRestaurants";

const { width, height } = Dimensions.get("window");

function MyCarousel({ data }: { data?: any }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      data={data === undefined ? [...new Array(6).keys()] : data}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            width: width * 0.75,
            height: width / 2,
            borderRadius: 20,
            borderWidth: 0,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
            //overflow: "hidden",
          }}
        >
          {data === undefined ? (
            <Text style={{ textAlign: "center", fontSize: 30, paddingTop: 70 }}>
              gregarious{index}
            </Text>
          ) : (
            <Pressable
              onPress={
                () =>
                  router.push({
                    pathname: "/store/:restaurant",
                    params: { restaurant: item.id },
                  })
                //router.push("/store/test")
              }
              style={{ flex: 1 }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: item.restaurant_image }}
                  style={{
                    width: "100%",
                    height: width / 4,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "white",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingTop: 6,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  {/*****************************************/}
                  {/****** RESTAURANT TITLE AND RATING ******/}
                  {/*****************************************/}
                  <View style={{ flexDirection: "row", paddingBottom: 4 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "#CE3535",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  {/*****************************/}
                  {/****** RESTAURANT INFO ******/}
                  {/*****************************/}
                  <View>
                    <View style={{ flexDirection: "row", paddingBottom: 8 }}>
                      <MaterialIcons
                        name="hourglass-empty"
                        size={16}
                        color="#8c8c8c"
                      />
                      <Text style={{ color: "#8c8c8c" }}>{item.wait_time}</Text>
                      <View style={{ width: 20 }}></View>
                      <MaterialCommunityIcons
                        name="currency-usd"
                        size={16}
                        color="#8c8c8c"
                      />
                      <Text style={{ color: "#8c8c8c" }}>
                        {item.price_range}
                      </Text>
                    </View>
                    {/******************/}
                    {/****** TAGS ******/}
                    {/******************/}
                    <View
                      style={{
                        flexDirection: "row",
                        //backgroundColor: "lightcyan",
                        overflow: "hidden",
                      }}
                    >
                      {(() => {
                        let totalLength = 0;
                        const maxTotalLength = 22;
                        return item.tags
                          .slice(0, 3)
                          .filter((tag: string) => {
                            totalLength += tag.length;
                            return totalLength <= maxTotalLength;
                          })
                          .map((tag: string, index: number) => (
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
                              key={index}
                            >
                              <Text>{tag}</Text>
                            </View>
                          ));
                      })()}
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
      }}
      style={{
        flex: 1,
        //backgroundColor: "magenta",
      }}
    />
  );
}

function MyShowcase({ title, data }: { title: string; data?: any }) {
  return (
    <View>
      <Text
        style={{
          paddingLeft: 20,
          fontSize: 23,
          fontWeight: "bold",
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <MyCarousel data={data} />
    </View>
  );
}
/********************************/
// Get restaurants from database
/********************************/
async function fetchRestaurants() {
  let { data, error } = await supabase
    .from("Restaurant Table")
    .select("id,name,restaurant_image,tags,wait_time,price_range,status");

  if (error) {
    console.log("error", error);
    return null; // or return [];
  } else {
    //console.log(JSON.stringify(data, null, 2));
    //console.log("HOME DaaTA", data);
    return data;
  }
}

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [restaurantss, setRestaurantss] = useState(sampleRestaurants);

  const [trendingRestaurants, setTrendingRestaurants] = useState<any[]>([]);
  const [favouriteRestaurants, setFavouriteRestaurants] = useState<any[]>([]);
  const [seaFoodRestaurants, setSeaFoodRestaurants] = useState<any[]>([]);
  const [chickenRestaurants, setChickenRestaurants] = useState<any[]>([]);
  const [meatRestaurants, setMeatRestaurants] = useState<any[]>([]);
  const [japaneseRestaurants, setJapaneseRestaurants] = useState<any[]>([]);

  // Get restaurants from database
  useEffect(() => {
    fetchRestaurants().then((data) => {
      if (data) {
        setRestaurants(data);

        /**********************************/
        /********* Make carousels *********/
        /**********************************/

        // Trending restaurants
        const trending = data.filter(
          (restaurant) => restaurant.status === "Trending"
        );
        setTrendingRestaurants(trending);
        //console.log("TRENDING", trending);

        // Seafood restaurants
        const seaFood = data.filter((restaurant) =>
          restaurant.tags.includes("Sea Food")
        );
        setSeaFoodRestaurants(seaFood);

        // Meat restaurants
        const meat = data.filter((restaurant) =>
          restaurant.tags.includes("Beef")
        );
        setMeatRestaurants(meat);

        // Chicken restaurants
        const chicken = data.filter((restaurant) =>
          restaurant.tags.includes("Chicken")
        );
        setChickenRestaurants(chicken);

        // Japanese restaurants
        const japanese = data.filter((restaurant) =>
          restaurant.tags.includes("Japanese")
        );
        setJapaneseRestaurants(japanese);
      }
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          //paddingBottom: 20,
          backgroundColor: "white",
        }}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <MyShowcase title="EL GRAN PACHONASO" data={trendingRestaurants} />
        <MyShowcase title="Sea Food" data={seaFoodRestaurants} />
        <MyShowcase title="Meat" data={meatRestaurants} />
        <MyShowcase title="Chicken" data={chickenRestaurants} />
        <MyShowcase title="Japanese" data={japaneseRestaurants} />
      </ScrollView>
    </>
  );
}

{
  /* <View style={{ flex: 1 }}>
          <Carousel
            loop={false}
            width={width}
            height={width / 2}
            autoPlay={false}
            enabled={true}
            defaultIndex={4}
            pagingEnabled={false}
            snapEnabled={false}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index }) => (
              <View
                style={{
                  flex: 1,
                  width: width * 0.6,
                  marginLeft: 20,
                  marginRight: 20,
                  borderWidth: 1,
                  justifyContent: "center",
                  backgroundColor: "pink",
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 30 }}>
                  {index}
                </Text>
              </View>
            )}
          />
        </View> */
}
