import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions, Image } from "react-native";
import { router } from "expo-router";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { supabase } from "../../utils/supabase";
import { Session } from "@supabase/supabase-js";

const { width, height } = Dimensions.get("window");

/*****************/
// Fetch user info
/*****************/
async function fetchUserInfo({ user_id }: { user_id: string }) {
  const { data, error } = await supabase
    .from("Profile Table")
    .select("name,phone,location")
    .eq("id", user_id)
    .single();
  if (error) {
    console.log("Account Fetch Error: ", error);
    return null;
  } else {
    return data;
  }
}

/*****************************************/
// Get number of reservations from user ID
/*****************************************/
async function fetchNumberReservations({ user_id }: { user_id: string }) {
  const { data, error, count } = await supabase
    .from("Reservation Table")
    .select("user_id", { count: "exact" })
    .eq("user_id", user_id);

  if (error) {
    console.log("Error fetching reservations count: ", error);
    return null;
  } else {
    return count;
  }
}

export default function AccountHeader() {
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

  // Fetch User Info
  interface UserInfo {
    name: string;
    phone: string;
    location: string;
  }
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserInfo({ user_id: session.user.id }).then((data) => {
        if (data) {
          setUserInfo({
            name: data.name,
            phone: data.phone,
            location: data.location,
          });
        }
      });
    }
  }, [session]);

  // Fetch number of reservations
  const [numberReservations, setNumberReservations] = useState<number>(0);
  useEffect(() => {
    if (session?.user?.id) {
      fetchNumberReservations({ user_id: session.user.id }).then((data) => {
        if (data) {
          //console.log("NUMBER OF RESERVATIONS", data);
          setNumberReservations(data);
        }
      });
    }
  }, [session]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: height * 0.43,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 55,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: 24 }} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Account</Text>
          <Pressable onPress={() => router.push({ pathname: "/settings" })}>
            <Octicons name="gear" size={24} color="#8c8c8c" />
          </Pressable>
        </View>
        <View style={{ flex: 1, alignItems: "center", paddingTop: 5 }}>
          <Image
            source={require("../../assets/images/ProfilePlaceholder.jpg")}
            style={{
              width: width * 0.35,
              height: 131,
              paddingTop: 0,
              paddingBottom: 0,
              backgroundColor: "pink",
              borderRadius: 100,
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#CE3535",
              paddingTop: 10,
            }}
          >
            {userInfo.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={16} color="black" />
            <Text style={{ paddingLeft: 5, color: "black" }}>
              {userInfo.location}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 12,
              width: width * 0.6,
              backgroundColor: "white",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "600" }}>3</Text>
              <Text>Favourites</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "600" }}>
                {numberReservations}
              </Text>
              <Text>Reservations</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
