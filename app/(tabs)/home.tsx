import React, { useState, useEffect, useCallback } from "react";
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
import { router, useFocusEffect } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabase";
import { sampleRestaurants } from "../../constants/SampleRestaurants";

const { width, height } = Dimensions.get("window");

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

/********************************/
// Get restaurants from database
/********************************/
async function fetchUserFavourites({ user_id }: { user_id: string }) {
  const { data, error } = await supabase
    .from("Profile Table")
    .select("favourites")
    .eq("id", user_id);

  if (error) {
    console.log("Error fetching favourites: ", error);
    return null;
  } else {
    return data;
  }
}

/**
 *
 *
 *
 * Home Screen
 *
 *
 *
 */
export default function HomeScreen() {
  // Get session
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [restaurants, setRestaurants] = useState<any[]>([]);

  const [trendingRestaurants, setTrendingRestaurants] = useState<any[]>([]);
  const [seaFoodRestaurants, setSeaFoodRestaurants] = useState<any[]>([]);
  const [chickenRestaurants, setChickenRestaurants] = useState<any[]>([]);
  const [meatRestaurants, setMeatRestaurants] = useState<any[]>([]);
  const [japaneseRestaurants, setJapaneseRestaurants] = useState<any[]>([]);

  // Get user's favourites
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingFavourites, setIsLoadingFavourites] = useState<boolean>(true);
  const [favouritesIds, setFavouritesIds] = useState<any[]>([]);
  const [favouriteRestaurants, setFavouriteRestaurants] = useState<any[]>([]);

  // Get user ID once on component mount
  useEffect(() => {
    const userId = session?.user?.id;

    // Check if user ID is available
    if (userId) {
      setUserId(userId);
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session && !isLoading && userId !== null) {
      console.log("Guinea pig");
      fetchUserFavourites({ user_id: userId }).then((data) => {
        if (data) {
          setFavouritesIds(data[0].favourites);
          setIsLoadingFavourites(false);
          console.log("FAVOURITESS", data[0].favourites);
        }
      });
    }
  }, [isLoading]);

  useFocusEffect(
    useCallback(() => {
      if (session && !isLoading && userId !== null) {
        console.log("useFocusEffect");
        fetchUserFavourites({ user_id: userId }).then((data) => {
          if (data) {
            setFavouritesIds(data[0].favourites);
            setIsLoadingFavourites(false);
            console.log("useFocusEffect FAVOURITESS", data[0].favourites);
          }
        });
      }
    }, [session, isLoading, userId])
  );

  // Get restaurants from database
  useEffect(() => {
    if (!isLoadingFavourites) {
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

          // Favourites restaurants
          console.log("favouriteIds", favouritesIds);
          const favourites = data.filter((restaurant) =>
            favouritesIds.includes(restaurant.id)
          );
          //console.log("TRUE FAVOURITES", favourites);
          setFavouriteRestaurants(favourites);

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
    }
  }, [isLoadingFavourites, favouritesIds]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          //paddingBottom: 20,
          backgroundColor: "#f5f5f5",
        }}
        style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      >
        <MyShowcase title="EL GRAN PACHONASO" data={trendingRestaurants} />
        <MyShowcase title="Favourites" data={favouriteRestaurants} />
        <MyShowcase title="Sea Food" data={seaFoodRestaurants} />
        <MyShowcase title="Meat" data={meatRestaurants} />
        <MyShowcase title="Chicken" data={chickenRestaurants} />
        <MyShowcase title="Japanese" data={japaneseRestaurants} />
      </ScrollView>
    </>
  );
}

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
        backgroundColor: "#f5f5f5",
      }}
    />
  );
}

function MyShowcase({ title, data }: { title: string; data?: any }) {
  return (
    <View style={{ backgroundColor: "#f5f5f5" }}>
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
