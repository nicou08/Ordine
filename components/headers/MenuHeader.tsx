import React, { useState, useContext, useEffect } from "react";
import { Pressable, View, Text, FlatList, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { ScrollViewContext } from "../../context/ScrollViewContext";
import { CategoryContext } from "../../context/CategoryContext";

export default function MenuHeader() {
  const searchParams = useLocalSearchParams();

  const scrollViewRef = useContext(ScrollViewContext);
  useEffect(() => {
    console.log("header ScrollViewRefff", scrollViewRef);
  }, [scrollViewRef]);

  const categoryPositions = useContext(CategoryContext);

  useEffect(() => {
    console.log("header CATEGORY POSITIONS", categoryPositions);
  }, [categoryPositions]);

  const handleCategoryPress = (category: string) => {
    console.log("CATEGORY", category);
    console.log("categoryPositions", categoryPositions[category]);
    console.log("ScrollViewRef", scrollViewRef);
    if (scrollViewRef != null) {
      const currentScrollViewRef = scrollViewRef.current;
      const categoryPosition = categoryPositions[category];

      if (currentScrollViewRef && categoryPosition != null) {
        currentScrollViewRef.scrollTo({
          y: categoryPosition,
          animated: true,
        });
      }
    }
  };

  const menuCategories2 = [
    "Appetizers",
    "MainDishes",
    "Desserts",
    "Drinks",
    "AlcoholicDrinks",
  ];

  const menuCategories = [
    "Appetizers",
    "Main Dishes",
    "Desserts",
    "Drinks",
    "Alcoholic Drinks",
  ];
  const [currentMenuCategoryIndex, setCurrentMenuCategoryIndex] = useState(0);

  return (
    <View
      style={{
        height: Platform.OS === "android" ? 230 : 220,
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
            Menu
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
        </View>

        {/***********************/}
        {/*** MENU CATEGORIES ***/}
        {/***********************/}
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginTop: 10,
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={menuCategories}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setCurrentMenuCategoryIndex(index);
                  handleCategoryPress(menuCategories2[index]);
                  console.log("INDEX", menuCategories2[index]);
                }}
                style={{
                  backgroundColor: "white",
                  //padding: 10,
                  marginRight: index != 4 ? 20 : 5,
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    fontSize: Platform.OS === "android" ? 19 : 19,
                    fontWeight:
                      currentMenuCategoryIndex === index ? "400" : "400",
                    color:
                      currentMenuCategoryIndex === index ? "#CE3535" : "black",
                    flex: 1,
                  }}
                >
                  {item}
                </Text>
                <View
                  style={{
                    height: 10,
                    backgroundColor:
                      currentMenuCategoryIndex === index ? "#CE3535" : "white",
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                  }}
                ></View>
              </Pressable>
            )}
          />
        </View>
      </View>
    </View>
  );
}

//const scrollViewRef = useRef();
//const scrollViewRef = useRef<ScrollView>(null);
// const categoryRefs = menuCategories.reduce((acc, curr) => {
//   acc[curr] = createRef();
//   return acc;
// }, {});

// const handleCategoryPress = (category) => {
//   scrollViewRef.current.scrollTo({
//     y: categoryRefs[category].current.offsetTop,
//     animated: true,
//   });
// };
