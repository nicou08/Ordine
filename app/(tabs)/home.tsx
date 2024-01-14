import React from "react";

import {
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

import { supabase } from "../../utils/supabase";

const { width, height } = Dimensions.get("window");

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One HUHHHhhmm</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        <Text>what the fuck</Text>
      </View>

      <TouchableOpacity
        style={{ marginTop: 100, backgroundColor: "red", paddingBottom: 120 }}
        onPress={() => supabase.auth.signOut()}
      >
        <Text>SIGNNN OUTT</Text>
      </TouchableOpacity>
      <TextInput
        style={{
          height: 40,
          width: width * 0.8,
          backgroundColor: "#F1F1F1",
          borderRadius: 20,
          paddingLeft: 20,
        }}
        placeholder="Email"
        placeholderTextColor={"gray"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
