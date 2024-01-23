import React from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { Link, Tabs, Stack, Slot } from "expo-router";

import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import HomeSearchHeader from "../../components/headers/HomeSearchHeader";
import AccountHeader from "../../components/headers/AccountHeader";
import ReservationHeader from "../../components/headers/ReservationHeader";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#CE3535",
      }}
    >
      {/* <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      /> */}

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            //<AntDesign name="home" size={28} color={color} />
            //<Ionicons name="home" size={28} color={color} />
            <FontAwesome5 name="home" size={28} color={color} />
          ),
          header: () => <HomeSearchHeader title="Restaurants" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={28} color={color} />
          ),
          header: () => <HomeSearchHeader title="Search" />,
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          title: "Reservations",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
          header: () => <ReservationHeader />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              size={28}
              color={color}
            />
          ),
          header: () => <AccountHeader />,
        }}
      />
    </Tabs>
  );
}

{
  /* <Tabs.Screen
        name="search"
        options={({route, options }) => ({
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={28} color={color} />
          ),
          header: () => {
            const title = getHeaderTitle(options, route.name);
            return <HomeSearchHeader title={title}/>;
          },
        })}
      /> */
}
