import React, { useState } from "react";
import {
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { router } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { supabase } from "../../utils/supabase";

import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      console.log("There was an error at sign UPPP", error.message);
    } else {
      console.log("Signing-UPPP with email and password was sucessfull");
      if (!session)
        Alert.alert("Please check your inbox for email verification!");
    }
    setLoading(false);
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ marginTop: 70, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            width: width * 0.85,
            alignItems: "center",
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
          <TextInput
            style={{
              height: 40,
              width: width * 0.63,
              paddingLeft: 20,
            }}
            placeholder="Enter your email"
            placeholderTextColor={"gray"}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            width: width * 0.85,
            alignItems: "center",
            marginTop: 10,
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
          <TextInput
            style={{
              height: 40,
              width: width * 0.63,
              paddingLeft: 20,
            }}
            placeholder="Enter your password"
            placeholderTextColor={"gray"}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            width: width * 0.85,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              width: width * 0.22,
              paddingLeft: 20,
            }}
          >
            Confirm
          </Text>
          <TextInput
            style={{
              height: 40,
              width: width * 0.63,
              paddingLeft: 20,
            }}
            placeholder="Confirm your password"
            placeholderTextColor={"gray"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            width: width * 0.85,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              width: width * 0.22,
              paddingLeft: 20,
            }}
          >
            Name
          </Text>
          <TextInput
            style={{
              height: 40,
              width: width * 0.63,
              paddingLeft: 20,
            }}
            placeholder="Enter your name"
            placeholderTextColor={"gray"}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F1F1F1",
            borderRadius: 20,
            width: width * 0.85,
            alignItems: "center",
            marginTop: 10,
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
          <TextInput
            style={{
              height: 40,
              width: width * 0.63,
              paddingLeft: 20,
            }}
            placeholder="Enter your phone number"
            placeholderTextColor={"gray"}
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <BouncyCheckbox
            fillColor="#CE3535"
            text="Accept Terms and Conditions"
            onPress={(isChecked: boolean) => {}}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#CE3535",
            width: width * 0.8,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
          onPress={() => signUpWithEmail()}
          disabled={loading}
        >
          <Text style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: 30,
        }}
      >
        <Text style={{}}>Already have an account? </Text>
        <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
          <Text style={{ color: "#CE3535" }}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}
