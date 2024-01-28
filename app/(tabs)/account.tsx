import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, TextInput } from "react-native";
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

export default function AccountScreen() {
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
          //console.log("Account Fetch Data: ", data);
          setUserInfo({
            name: data.name,
            phone: data.phone,
            location: data.location,
          });
        }
      });
    }
  }, [session]);

  const [email, setEmail] = useState<string>("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        //justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: width * 0.85,
          alignItems: "center",
          marginTop: 40,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "black",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Email
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: "gray",
          }}
        >
          {session?.user?.email}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: width * 0.85,
          alignItems: "center",
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "black",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Password
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: "gray",
          }}
        >
          ********
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          height: 40,
          width: width * 0.85,
          alignItems: "center",
          marginTop: 10,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            color: "black",
            width: width * 0.22,
            paddingLeft: 20,
          }}
        >
          Phone
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            color: "gray",
          }}
        >
          +1 {userInfo.phone}
        </Text>
      </View>
    </View>
  );
}
