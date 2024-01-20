import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  Pressable,
  StatusBar,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
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
                    params: { restaurant: item.name },
                  })
                //router.push("/store/test")
              }
              style={{ flex: 1 }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../../assets/images/sushi/mainSushi.jpg")}
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
                    //backgroundColor: "pink",
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    paddingTop: 6,
                    paddingLeft: 20,
                  }}
                >
                  {/* RESTAURANT TITLE AND RATING */}
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
                  {/* RESTAURANT INFO */}
                  <View>
                    <View style={{ flexDirection: "row", paddingBottom: 8 }}>
                      <MaterialIcons
                        name="hourglass-empty"
                        size={16}
                        color="#8c8c8c"
                      />
                      <Text style={{ color: "#8c8c8c" }}>{item.awaitTime}</Text>
                      <View style={{ width: 20 }}></View>
                      <MaterialCommunityIcons
                        name="currency-usd"
                        size={16}
                        color="#8c8c8c"
                      />
                      <Text style={{ color: "#8c8c8c" }}>
                        {" "}
                        {item.priceRange}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      {item.tags
                        .slice(0, 3)
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
                        ))}
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

export default function TabOneScreen() {
  const [restaurants, setRestaurants] = useState(sampleRestaurants);
  //console.log("restaurants", restaurants);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          //paddingBottom: 20,
        }}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <MyShowcase title="Trending" data={restaurants} />
        <MyShowcase title="Favourites" />
        <MyShowcase title="Japanese" />
        <MyShowcase title="EL GRAN PACHON" />
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
