import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
  Text,
  FlatList,
} from "react-native";
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
            width: width * 0.75,
            height: width / 2,
            borderRadius: 20,
            borderWidth: 0,
            justifyContent: "center",
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {data === undefined ? (
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              gregarious{index}
            </Text>
          ) : (
            <View>
              <Text style={{ textAlign: "center", fontSize: 30 }}>
                {item.name}
              </Text>
            </View>
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
  console.log("restaurants", restaurants);
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
