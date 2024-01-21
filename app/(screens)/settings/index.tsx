import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions, Image, Modal } from "react-native";
import {
  router,
  usePathname,
  useLocalSearchParams,
  useGlobalSearchParams,
} from "expo-router";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { supabase } from "../../../utils/supabase";

const { width } = Dimensions.get("window");

function SettingsButton({ page }: { page: string }) {
  const [settingsPage, setSettingsPage] = useState<string>("");

  useEffect(() => {
    if (page === "Terms of Use") setSettingsPage("TermsOfUse");
    else if (page === "Privacy") setSettingsPage("Privacy");
    else if (page === "Help Center") setSettingsPage("HelpCenter");
    else if (page === "Security") setSettingsPage("Security");
    else if (page === "Preferences") setSettingsPage("Preferences");
  }, [page]);

  return (
    <Pressable
      onPress={() => router.push(`/settings/${settingsPage}`)}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
      }}
    >
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 18 }}>{page}</Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <FontAwesome5 name="chevron-right" size={24} color="black" />
      </View>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const pathname = usePathname();
  const searchParams = useLocalSearchParams();
  const { globalSearchParams } = useGlobalSearchParams();
  console.log("settingsPathName: ", pathname);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          //backgroundColor: "lightgreen",
          paddingTop: 40,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <SettingsButton page="Preferences" />
        <SettingsButton page="Security" />
        <SettingsButton page="Terms of Use" />
        <SettingsButton page="Privacy" />
        <SettingsButton page="Help Center" />
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            height: 60,
            borderBottomWidth: 1,
            borderBottomColor: "grey",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18 }}>Sign Out</Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </View>
        </Pressable>
      </View>

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
                alignItems: "center",
                paddingTop: 14,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Image
                source={require("../../../assets/images/CancelReservImg.png")}
                style={{
                  width: 150,
                  height: 80,
                  backgroundColor: "white",
                }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  paddingTop: 15,
                  paddingBottom: 20,
                }}
              >
                Are you sure you want to sign out from your account?
              </Text>
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
                  padding: 10,
                  borderRadius: 50,
                }}
                onPress={() => supabase.auth.signOut()}
              >
                <AntDesign name="check" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
