import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  Platform,
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
import { supabase } from "../../../utils/supabase";
import Carousel from "react-native-reanimated-carousel";

import { sampleRestaurants } from "../../../constants/SampleRestaurants";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const width = Dimensions.get("window").width;

interface BusinessHourItem {
  day: string;
  hours: string;
}

interface MenuCategory {
  [category: string]: MenuItem[];
}

interface MenuItem {
  name: string;
  price: string;
  description: string;
  notice: string;
  ingredients: string[];
  image: string;
}

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: string;
  status: string;
  price_range: string;
  wait_time: string;
  distance_away: string;
  tags: string[];
  business_hours: BusinessHourItem[];
  menu: MenuCategory[];
  reviews: any[];
}

/********************************/
/*  Get restaurant information  */
/********************************/
async function fetchRestaurantInfo(restaurantID: string) {
  let { data, error } = await supabase
    .from("Restaurant Table")
    .select("*")
    .eq("id", restaurantID)
    .single();

  if (error) {
    console.log("error", error);
    return null; // or return [];
  } else {
    //console.log(JSON.stringify(data, null, 2));
    console.log("DATA [RESTAURANT]", data);
    return data;
  }
}

export default function RestaurantScreen() {
  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const pathname = usePathname();
  const searchParams = useLocalSearchParams();
  const { globalSearchParams } = useGlobalSearchParams();
  //console.log("searchParams: ", searchParams.restaurant);
  //console.log("searchParamsname: ", searchParams);

  // Get restaurant information
  useEffect(() => {
    fetchRestaurantInfo(searchParams.restaurant as string).then((data) => {
      if (data) {
        setRestaurantInfo(data);
        //console.log("restaurantInfo", restaurantInfo);

        // Make images array
        setImages([data.restaurant_image]);
        setImages((prevImages) => [
          ...prevImages,
          data.menu[0]["appetizers"][0].image,
          data.menu[1]["mainDishes"][0].image,
          data.menu[2]["desserts"][0].image,
        ]);
      }
    });
  }, [setImages]);

  // Images

  useEffect(() => {
    if (restaurantInfo) {
      // setImages(restaurantInfo.menu[0]["Appetizers"].map((item) => item.image));
      // console.log("IMAGES", images);
    }
  }, []);

  // Handle Heart Press
  const [heartFilled, setHeartFilled] = useState(false);

  const handleHeartPress = () => {
    setHeartFilled(!heartFilled);
  };

  // Font size
  const [fontSize, setFontSize] = useState(13);

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <Carousel
          //loop={false}
          width={width}
          height={width * 0.6}
          //autoPlay={false}
          data={images}
          scrollAnimationDuration={1000}
          //onSnapToItem={(index) => console.log("current index:", images[index])}
          renderItem={({ item, index }) => (
            <View
              style={{
                //flex: 1,
                width: width,
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: width,
                  height: width * 0.7,
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
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#8c8c8c",
                    fontSize: fontSize,
                  }}
                >
                  {restaurantInfo?.address}
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
                <MaterialIcons
                  name="hourglass-empty"
                  size={16}
                  color="#8c8c8c"
                />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#8c8c8c",
                    fontSize: fontSize,
                  }}
                >
                  {restaurantInfo?.wait_time}
                </Text>
                <View style={{ width: 8 }}></View>
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={16}
                  color="#8c8c8c"
                />
                <Text
                  style={{
                    paddingLeft: 0,
                    color: "#8c8c8c",
                    fontSize: fontSize,
                  }}
                >
                  {restaurantInfo?.price_range}
                </Text>

                <View style={{ width: 9 }}></View>
                <MaterialCommunityIcons
                  name="map-outline"
                  size={16}
                  color="#8c8c8c"
                />
                <Text
                  style={{
                    paddingLeft: 3,
                    color: "#8c8c8c",
                    fontSize: fontSize,
                  }}
                >
                  {restaurantInfo?.distance_away} away
                </Text>
              </View>
              <View style={{ paddingLeft: 10, flexDirection: "row" }}>
                <Ionicons name="link" size={16} color="#8c8c8c" />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: "#8c8c8c",
                    fontSize: fontSize,
                  }}
                >
                  {restaurantInfo?.website}
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
            data={restaurantInfo?.tags}
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
              backgroundColor: "white",
              width: width,
              flex: 1,
              alignItems: "center",
              paddingLeft: 20,
              paddingBottom: 10,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                alignSelf: "flex-start",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontSize: 17, color: "#8c8c8c", fontWeight: "bold" }}
              >
                DISHES{" "}
              </Text>
              <View style={{ justifyContent: "center" }}>
                <Entypo name="chevron-right" size={17} color="#8c8c8c" />
              </View>
            </Pressable>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            data={restaurantInfo?.menu[1]["mainDishes"]}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 30,
            }}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  width: width * 0.6,
                  height: width / 3,
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
                <Pressable>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: width / 3,
                      borderRadius: 20,
                      //borderTopRightRadius: 20,
                    }}
                  />
                </Pressable>
              </View>
            )}
          />

          {/***************************************/}
          {/***********  BUSINESS HOURS ***********/}
          {/***************************************/}
          <View
            style={{
              backgroundColor: "white",
              width: width,
              flex: 1,
              alignItems: "center",
              paddingLeft: 20,
              paddingBottom: 10,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                alignSelf: "flex-start",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontSize: 17, color: "#8c8c8c", fontWeight: "bold" }}
              >
                BUSINESS HOURS{" "}
              </Text>
              <View style={{ justifyContent: "center" }}>
                <Entypo name="chevron-right" size={17} color="#8c8c8c" />
              </View>
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: "white",
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 30,
            }}
          >
            {restaurantInfo?.business_hours.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15 }}>{item.day}</Text>
                <Text style={{ fontSize: 15 }}>{item.hours}</Text>
              </View>
            ))}
          </View>

          {/*************************************/}
          {/***********  USER RATINGS ***********/}
          {/*************************************/}
          <View
            style={{
              backgroundColor: "white",
              width: width,
              flex: 1,
              alignItems: "center",
              paddingLeft: 20,
              paddingBottom: 10,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "white",
                alignSelf: "flex-start",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontSize: 17, color: "#8c8c8c", fontWeight: "bold" }}
              >
                0 USER RATINGS{" "}
              </Text>
              <View style={{ justifyContent: "center" }}>
                <Entypo name="chevron-right" size={17} color="#8c8c8c" />
              </View>
            </Pressable>
          </View>
          <View style={{ height: 140 }}></View>
          {/* <Text style={{ paddingTop: 40 }}>Welcome! {pathname} </Text>
          <Text>
            searchParams: {searchParams.restaurant} type:{" "}
            {typeof searchParams.restaurant}{" "}
          </Text>
          <Text style={{ paddingBottom: 100 }}>
            globalSearchParams: {globalSearchParams}{" "}
          </Text> */}
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: width,
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: "white",
          borderTopWidth: 0.2,
        }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/reserving",
              params: {
                restaurantID: restaurantInfo?.id as string,
                name: restaurantInfo?.name as string,
                location: restaurantInfo?.address as string,
                distance: restaurantInfo?.distance_away as string,
              },
            })
          }
          style={{
            backgroundColor: "#CE3535",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}>
            Reserve
          </Text>
        </Pressable>
      </View>
    </>
  );
}
