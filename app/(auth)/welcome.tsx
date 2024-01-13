import React from "react";
//import { Text, View } from "../../components/Themed";
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  View,
  Text,
} from "react-native";
import { Link } from "expo-router";

import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warnUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/OrdineLogo.png")}
          style={{ width: 150, height: 60, backgroundColor: "white" }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.foodContainer}>
        {/* <Image
          source={require("../assets/images/FoodImage.png")}
          style={{ width: 290, height: 120, backgroundColor: "pink" }}
          resizeMode="contain"
        /> */}
        <Image
          source={require("../../assets/images/FoodImage.png")}
          style={{
            width: width * 0.66,
            height: height * 0.16,
            backgroundColor: "white",
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.signButtons}>
        <Link href={"/sign-in"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#CE3535",
              width: width * 0.8,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/sign-up"} asChild>
          <TouchableOpacity
            style={{
              backgroundColor: "#F1F1F1",
              width: width * 0.8,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "#CE3535", fontSize: 18, fontWeight: "bold" }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 200,
  },
  foodContainer: {
    marginTop: 30,
  },
  signButtons: {
    backgroundColor: "white",
    gap: 20,
    marginTop: 150,
  },
});

{
  /* <View>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
        </View>

        <View>
          <TextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity onPress={onSignInPress}>
          <Text>Sign in</Text>
        </TouchableOpacity>

        <Button title="Sign in Google" onPress={onPress} /> */
}
