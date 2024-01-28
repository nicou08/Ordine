import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../utils/supabase";
import ScrollViewProvider, {
  ScrollViewContext,
} from "../../../context/ScrollViewContext";
import { CategoryContext } from "../../../context/CategoryContext";

export default function MenuScreen() {
  const searchParams = useLocalSearchParams();
  //console.log("MENU SCREEN PARAMS", searchParams);

  //const scrollViewRef = useContext(ScrollViewContext);
  const scrollViewRef = useRef<ScrollView>(null);

  // const [categoryPositions, setCategoryPositions] = useState<{
  //   [key: string]: number;
  // }>({});
  const [categoryPositions, setCategoryPositions] = useState({
    Appetizers: 0,
    MainDishes: 0,
    Desserts: 0,
    Drinks: 0,
    AlcoholicDrinks: 0,
  });

  useEffect(() => {
    console.log("[menu] CATEGORY POSITIONS", categoryPositions);
  }, [categoryPositions]);

  useEffect(() => {
    console.log("[menu] ScrollViewRefff", scrollViewRef);
    // if (scrollViewRef != null) {
    //   const currentScrollViewRef = scrollViewRef.current;
    //   const categoryPosition = categoryPositions[CategoryContext.];

    //   if (currentScrollViewRef && categoryPosition != null) {
    //     currentScrollViewRef.scrollTo({
    //       y: categoryPosition,
    //       animated: true,
    //     });
    //   }
    // }
  }, [scrollViewRef]);

  const menuCategories = [
    "Appetizers",
    "Main Dishes",
    "Desserts",
    "Drinks",
    "Alcoholic Drinks",
  ];
  return (
    <ScrollViewContext.Provider value={scrollViewRef}>
      <CategoryContext.Provider value={categoryPositions}>
        <ScrollView
          ref={scrollViewRef}
          style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 30 }}
        >
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              //console.log("onLayout fired A:", y);
              setCategoryPositions((prevPositions) => ({
                ...prevPositions,
                ["Appetizers"]: y,
              }));
            }}
            style={{
              paddingBottom: 15,
              backgroundColor: "lightcyan",
              height: 500,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}
            >
              APPETIZERS
            </Text>
          </View>
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              //console.log("onLayout fired MD", y);
              setCategoryPositions((prevPositions) => ({
                ...prevPositions,
                ["MainDishes"]: y,
              }));
            }}
            style={{
              paddingBottom: 15,
              backgroundColor: "pink",
              height: 500,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}
            >
              MAIN DISHES
            </Text>
          </View>
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              //console.log("onLayout fired DSSS", y);
              setCategoryPositions((prevPositions) => ({
                ...prevPositions,
                ["Desserts"]: y,
              }));
            }}
            style={{
              paddingBottom: 15,
              backgroundColor: "lightgreen",
              height: 500,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}
            >
              DESSERTS
            </Text>
          </View>
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              //console.log("onLayout fired DR", y);
              setCategoryPositions((prevPositions) => ({
                ...prevPositions,
                ["Drinks"]: y,
              }));
            }}
            style={{
              paddingBottom: 15,
              backgroundColor: "lightcyan",
              height: 500,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}
            >
              DRINKS
            </Text>
          </View>
          <View
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              console.log("onLayout fired ADR", y);
              setCategoryPositions((prevPositions) => ({
                ...prevPositions,
                ["AlcoholicDrinks"]: y,
              }));
            }}
            style={{
              paddingBottom: 15,
              backgroundColor: "lightgreen",
              height: 500,
            }}
          >
            <Text
              style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}
            >
              ALCOHOLIC DRINKS
            </Text>
          </View>
        </ScrollView>
      </CategoryContext.Provider>
    </ScrollViewContext.Provider>
  );
}

function MenuCategory() {
  return (
    <View>
      <Text>MENU CATEGORY</Text>
    </View>
  );
}

// USE FLATLIST
// import React, { useRef, createRef } from 'react';
// import { ScrollView, View, Button, Text } from 'react-native';

// export default function MenuScreen() {
//   const categories = ['Appetizers', 'Main Course', 'Desserts'];
//   const scrollViewRef = useRef();
//   const categoryRefs = categories.reduce((acc, curr) => {
//     acc[curr] = createRef();
//     return acc;
//   }, {});

//   const handleCategoryPress = (category) => {
//     scrollViewRef.current.scrollTo({
//       y: categoryRefs[category].current.offsetTop,
//       animated: true,
//     });
//   };

//   return (
//     <>
//       <FlatList
//         horizontal
//         data={categories}
//         renderItem={({ item }) => (
//           <Button title={item} onPress={() => handleCategoryPress(item)} />
//         )}
//         keyExtractor={(item) => item}
//       />
//       <ScrollView ref={scrollViewRef}>
//         {categories.map((category) => (
//           <View key={category} ref={categoryRefs[category]}>
//             <Text>{category}</Text>
//             {/* Render dishes for this category */}
//           </View>
//         ))}
//       </ScrollView>
//     </>
//   );
// }
