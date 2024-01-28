import React, { useState, useEffect, useRef, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { supabase } from "../../../utils/supabase";
import { MenuScrollContext } from "../../../context/MenuScrollContext";
import { CategoryPositionContext } from "../../../context/CategoryContext";
import { CartContext } from "../../../context/CartContext";

const width = Dimensions.get("window").width;

export default function MenuScreen() {
  const searchParams = useLocalSearchParams();
  console.log("MENU SCREEN PARAMS", searchParams);

  const [menuData, setMenuData] = useState<[] | null>(null);

  /***************** Context *****************/

  const scrollViewRef = useContext(MenuScrollContext);

  const { addToCart } = useContext(CartContext);

  // useEffect(() => {
  //   console.log("[menu] CATEGORY POSITIONS", positions);
  // }, [positions]);

  // useEffect(() => {
  //   console.log("[menu] ScrollViewRefff", scrollViewRef);
  // }, [scrollViewRef]);

  /***************** Fetch menu *****************/
  useEffect(() => {
    fetchRestaurantMenu(searchParams.menu as string).then((data) => {
      if (data) {
        //console.log("DATAAAAAAAA", data);

        setMenuData(data.menu);
      }
    });
  }, [searchParams.menu]);

  const menuCategories = [
    "Appetizers",
    "Main Dishes",
    "Desserts",
    "Drinks",
    "Alcoholic Drinks",
  ];

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 30 }}
    >
      <TouchableOpacity onPress={addToCart} style={{ backgroundColor: "gray" }}>
        <Text style={{ color: "white", fontSize: 40 }}>Add one</Text>
      </TouchableOpacity>
      {menuCategories.map(
        (category, index) =>
          menuData && (
            <MenuCategory
              category={category}
              index={index}
              menuCategoryData={menuData[index]}
              key={index}
            />
          )
      )}
      {/* <View
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
        <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
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
        <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
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
        <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
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
        <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
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
        <Text style={{ fontSize: 14, color: "#8c8c8c", fontWeight: "bold" }}>
          ALCOHOLIC DRINKS
        </Text>
      </View> */}
      <View style={{ height: Platform.OS === "android" ? 50 : 70 }}></View>
    </ScrollView>
  );
}

// Menu category component

interface MenuItemProps {
  menuItem: {
    name: string;
    price: number;
    image: string;
    description: string;
    notice: string[];
    ingredients: string[];
  };
}

function MenuCategory({
  category,
  index,
  menuCategoryData,
}: {
  category: string;
  index: number;
  menuCategoryData: [];
}) {
  /***************** Context *****************/

  const contextValue = useContext(CategoryPositionContext);

  if (!contextValue) {
    throw new Error("CategoryPositionContext is undefined");
  }

  const { positions, setCategoryPositions } = contextValue;

  //console.log("MenuDATA: ", menuCategoryData);
  //console.log("aaaa", category.replace(/\s/g, ""));
  const menuItems: MenuItemProps["menuItem"][] =
    Object.values(menuCategoryData)[0] || [];
  //console.log("MenuItems: ", menuItems);
  return (
    <View
      onLayout={(event) => {
        const { y } = event.nativeEvent.layout;
        //console.log("onLayout fired A:", y);
        setCategoryPositions((prevPositions) => ({
          ...prevPositions,
          [category.replace(/\s/g, "")]: y,
        }));
      }}
      style={{
        paddingBottom: 10,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#8c8c8c",
          fontWeight: "bold",
          paddingBottom: 10,
        }}
      >
        {category.toUpperCase()}
      </Text>
      {menuItems.map((item: MenuItemProps["menuItem"], index: number) => (
        <MenuItem menuItem={item} key={index} />
      ))}
    </View>
  );
}

function MenuItem({ menuItem }: MenuItemProps) {
  const [modalVisible, setModalVisible] = useState(false);

  //console.log("menuItem", menuItem);

  return (
    <View style={{ overflow: "hidden" }}>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={{
          flexDirection: "row",
          paddingBottom: 0,
          //backgroundColor: "",
        }}
      >
        <Image
          source={{ uri: menuItem.image }}
          style={{
            width: 150,
            height: width * 0.27,
            resizeMode: "cover",
            borderRadius: 30,
          }}
        />
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            //backgroundColor: "pink",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {menuItem.name}
            </Text>
            <Text style={{ fontSize: 14, color: "#8c8c8c", flexWrap: "wrap" }}>
              {menuItem.description}
            </Text>
          </View>
          <View style={{ height: 10 }}></View>
          <Text style={{ color: "black", fontSize: 15 }}>
            ${menuItem.price}
          </Text>
        </View>
      </Pressable>
      <View style={{ height: 20 }}></View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
                borderRadius: 35,
                paddingTop: 20,
                paddingLeft: 30,
                paddingRight: 30,
                paddingBottom: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  paddingBottom: 5,
                }}
              >
                {menuItem.name}
              </Text>
              <Text style={{ fontSize: 15, color: "#8c8c8c" }}>
                {menuItem.description}
              </Text>
              <View style={{ height: 30 }}></View>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, paddingBottom: 7 }}
              >
                Notice
              </Text>
              {menuItem.notice.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
              <View style={{ height: 17 }}></View>
              <Text
                style={{ fontWeight: "bold", fontSize: 17, paddingBottom: 7 }}
              >
                Ingredients
              </Text>
              {menuItem.ingredients.map((item, index) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>

            <View
              style={{
                //backgroundColor: "white",
                flexDirection: "row",
                paddingTop: 20,
                //alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Pressable
                style={{
                  marginLeft: 10,
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 50,
                }}
                onPress={() => setModalVisible(false)}
              >
                <AntDesign name="close" size={24} color="black" />
              </Pressable>
              <View style={{ width: 10 }}></View>
              <Pressable
                style={{
                  marginRight: 10,
                  backgroundColor: "#CE3535",
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 30,
                  paddingRight: 30,
                  borderRadius: 50,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "500" }}
                >
                  Add
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/***********************/
// Fetch restaurant menu
/***********************/
async function fetchRestaurantMenu(restaurantID: string) {
  const { data, error } = await supabase
    .from("Restaurant Table")
    .select("menu")
    .eq("id", restaurantID)
    .single();

  if (error) {
    console.log("error", error);
    return null;
  } else {
    return data;
  }
}
