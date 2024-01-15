import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs, Stack, Slot } from "expo-router";
import { getHeaderTitle } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import HomeSearchHeader from "../../components/headers/HomeSearchHeader";
import React from "react";

const Tabss = createBottomTabNavigator();
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const SearchScreen = () => {
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          header: () => <HomeSearchHeader title="Search" />,
        }}
      />
    </Stack>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
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
      />
      <Tabs.Screen
        name="search"
        //component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={28} color={color} />
          ),
        }}
      >
        {/* {() => (
          <Stack>
            <Stack.Screen
              name="search"
              options={{
                header: () => <HomeSearchHeader title="Search" />,
              }}
            />
          </Stack>
        )} */}
      </Tabs.Screen>
      <Tabs.Screen
        name="reserve"
        options={{
          title: "Reserve",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={28}
              color={color}
            />
          ),
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
