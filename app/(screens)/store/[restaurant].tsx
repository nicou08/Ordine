import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  Pressable,
  FlatList,
  Platform,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { router, usePathname, useLocalSearchParams } from "expo-router";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { supabase } from "../../../utils/supabase";
import { Session } from "@supabase/supabase-js";
import Carousel from "react-native-reanimated-carousel";
//import { TouchableOpacity } from "react-native-gesture-handler";

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
    //console.log("DATA [RESTAURANT]", data);
    return data;
  }
}

/********************************/
/*  Get restaurant reviews  */
/********************************/
async function fetchRestaurantReviews({
  restaurantID,
}: {
  restaurantID: string;
}) {
  let { data, error } = await supabase
    .from("Reviews Table")
    .select("*")
    .eq("restaurant_id", restaurantID);

  if (error) {
    console.log("error", error);
    return null; // or return [];
  } else {
    //console.log(JSON.stringify(data, null, 2));
    //console.log("DATA [RESTAURANT]", data);
    return data;
  }
}

/*******************/
/*  Get user name  */
/*******************/
async function getUserName({ user_id }: { user_id: string }) {
  const { data, error } = await supabase
    .from("Profile Table")
    .select("name")
    .eq("id", user_id)
    .single();

  if (error) {
    console.log("Error fetching user name: ", error);
    return null;
  } else {
    return data;
  }
}

/****************************/
/*  Post Restaurant Review  */
/****************************/
async function postReview({
  restaurant_id,
  name,
  rating,
  review,
}: {
  restaurant_id: string;
  name: string;
  rating: number;
  review: string;
}) {
  console.log("restaurant_id", restaurant_id);
  console.log("name", name);
  console.log("rating", rating);
  console.log("review", review);

  const { data, error } = await supabase.from("Reviews Table").insert([
    {
      restaurant_id: restaurant_id,
      user_name: name,
      rating: rating,
      review: review,
    },
  ]);

  if (error) {
    console.log("Error posting review: ", error);
    return null;
  } else {
    console.log("Review posted successfully!");
    return data;
  }
}

export default function RestaurantScreen() {
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

  const [restaurantInfo, setRestaurantInfo] = useState<Restaurant | null>(null);
  const [restaurantReviews, setRestaurantReviews] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const searchParams = useLocalSearchParams();

  const [userName, setUserName] = useState("");

  const [modalReviewVisible, setModalReviewVisible] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
  });

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

  // Get user name
  useEffect(() => {
    if (session) {
      getUserName({ user_id: session.user.id }).then((data) => {
        if (data) {
          setUserName(data.name);
        }
      });
    }
  });

  // Get restaurant reviews
  useEffect(() => {
    fetchRestaurantReviews({
      restaurantID: searchParams.restaurant as string,
    }).then((data) => {
      if (data) {
        setRestaurantReviews(data);
        console.log("restaurantReviews", data);
      }
    });
  }, []);

  // Handle review submit
  const handleReviewSubmit = () => {
    // Add review to database
    postReview({
      restaurant_id: restaurantInfo?.id as string,
      name: userName,
      rating: review.rating,
      review: review.comment,
    });
  };

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
              onPress={() =>
                router.push({
                  pathname: "/menu/:menu",
                  params: {
                    menu: restaurantInfo?.id as string,
                    name: restaurantInfo?.name as string,
                    location: restaurantInfo?.address as string,
                  },
                })
              }
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
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/menu/:menu",
                      params: {
                        menu: restaurantInfo?.id as string,
                        name: restaurantInfo?.name as string,
                        location: restaurantInfo?.address as string,
                      },
                    })
                  }
                >
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
              paddingRight: 20,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                alignSelf: "flex-start",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 17, color: "#8c8c8c", fontWeight: "bold" }}
                >
                  {restaurantReviews.length} USER RATINGS{" "}
                </Text>
                <View style={{ justifyContent: "center" }}>
                  <Entypo name="chevron-right" size={17} color="#8c8c8c" />
                </View>
              </View>
              <Pressable
                onPress={() => setModalReviewVisible(true)}
                style={{
                  //backgroundColor: "lightcyan",
                  padding: 0,
                  margin: 0,
                  borderRadius: 0,
                  //height: 17,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 17, color: "#CE3535", fontWeight: "bold" }}
                >
                  WRITE REIVEW
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
              }}
            >
              {restaurantReviews.length > 0 ? (
                <View style={{ paddingTop: 20, marginBottom: 110 }}>
                  {restaurantReviews.map((item, index) => (
                    <View
                      key={index}
                      style={{ flexDirection: "row", paddingBottom: 30 }}
                    >
                      <Image
                        source={require("../../../assets/images/ProfilePlaceholder.jpg")}
                        style={{ height: 40, width: 40, borderRadius: 100 }}
                      />
                      <View
                        style={{ paddingLeft: 20, paddingRight: 0, flex: 1 }}
                      >
                        <Text style={{ fontWeight: "500", fontSize: 18 }}>
                          {item.user_name}
                        </Text>
                        <Text style={{ paddingTop: 5 }}>{item.review}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{ height: 140 }}></View>
              )}
            </View>
          </View>
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

      {/************************************************************/}
      {/******************** WRITE REVIEW MODAL ********************/}
      {/************************************************************/}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalReviewVisible}
        onRequestClose={() => setModalReviewVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View style={{}}>
              <View
                style={{
                  width: width * 0.9,
                  backgroundColor: "white",
                  borderRadius: 40,
                  // alignItems: "center",
                  // justifyContent: "center",
                  paddingTop: 20,
                  paddingBottom: 40,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View
                  style={{ flexDirection: "row", height: 50, marginBottom: 20 }}
                >
                  <Image
                    source={require("../../../assets/images/ProfilePlaceholder.jpg")}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      backgroundColor: "gray",
                      marginBottom: 10,
                    }}
                  />
                  <View
                    style={{
                      //backgroundColor: "pink",
                      flex: 1,
                      justifyContent: "center",
                      paddingLeft: 20,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      {userName}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => setModalReviewVisible(false)}
                    style={{
                      backgroundColor: "#CE3535",
                      width: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 100,
                    }}
                  >
                    <AntDesign name="close" size={24} color="white" />
                  </Pressable>
                </View>
                <View
                  style={{
                    height: 100,
                    backgroundColor: "#F1F1F1",
                    borderRadius: 20,
                    paddingTop: 12,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingBottom: 12,
                  }}
                >
                  <TextInput
                    placeholder="Write a review"
                    placeholderTextColor={"gray"}
                    style={{ color: "black" }}
                    multiline={true}
                    keyboardType="default"
                    textContentType="none"
                    returnKeyType="done"
                    value={review.comment}
                    onChangeText={(text) =>
                      setReview((prevReview) => ({
                        ...prevReview,
                        comment: text,
                      }))
                    }
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        setReview((prevReview) => ({
                          ...prevReview,
                          rating: 1,
                        }))
                      }
                    >
                      <Entypo
                        name={review.rating >= 1 ? "star" : "star-outlined"}
                        size={30}
                        color="#CE3535"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        setReview((prevReview) => ({
                          ...prevReview,
                          rating: 2,
                        }))
                      }
                    >
                      <Entypo
                        name={review.rating >= 2 ? "star" : "star-outlined"}
                        size={30}
                        color="#CE3535"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        setReview((prevReview) => ({
                          ...prevReview,
                          rating: 3,
                        }))
                      }
                    >
                      <Entypo
                        name={review.rating >= 3 ? "star" : "star-outlined"}
                        size={30}
                        color="#CE3535"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        setReview((prevReview) => ({
                          ...prevReview,
                          rating: 4,
                        }))
                      }
                    >
                      <Entypo
                        name={review.rating >= 4 ? "star" : "star-outlined"}
                        size={30}
                        color="#CE3535"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        setReview((prevReview) => ({
                          ...prevReview,
                          rating: 5,
                        }))
                      }
                    >
                      <Entypo
                        name={review.rating >= 5 ? "star" : "star-outlined"}
                        size={30}
                        color="#CE3535"
                      />
                    </Pressable>
                  </View>
                  <View style={{ paddingLeft: 15 }}>
                    <Pressable
                      onPress={() => {
                        handleReviewSubmit();
                        setModalReviewVisible(false);
                        setReview({ rating: 0, comment: "" });
                      }}
                      style={{
                        backgroundColor: "#f1f1f1",
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: "#CE3535",
                          fontSize: 20,
                          fontWeight: "600",
                        }}
                      >
                        Submit
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
// Consolas, 'Courier New', monospace
