import React, { useState } from "react";
//import { Text, View } from "../../components/Themed";
import {
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
  Text,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { supabase } from "../../utils/supabase";

//import * as WebBrowser from "expo-web-browser";
//import { useWarmUpBrowser } from "../../hooks/warnUpBrowser";
//
//WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

export default function SignInScreen() {
  // // ########################################################
  // // SIGN IN WITH EMAIL AND PASSWORD

  // const { signIn, setActive, isLoaded } = useSignIn();

  // const [emailAddress, setEmailAddress] = React.useState("");
  // const [password, setPassword] = React.useState("");

  // const onSignInPress = async () => {
  //   if (!isLoaded) {
  //     return;
  //   }

  //   try {
  //     const completeSignIn = await signIn.create({
  //       identifier: emailAddress,
  //       password,
  //     });
  //     // This is an important step,
  //     // This indicates the user is signed in
  //     await setActive({ session: completeSignIn.createdSessionId });
  //   } catch (err: any) {
  //     console.log(err);
  //   }
  // };

  // // ########################################################
  // // SIGN IN WITH OAUTH
  // // Warm up the android browser to improve UX
  // // https://docs.expo.dev/guides/authentication/#improving-user-experience

  // useWarmUpBrowser();

  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // const onPress = React.useCallback(async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow();

  //     if (createdSessionId && setActive) {
  //       setActive({ session: createdSessionId });
  //     } else {
  //       // Use signIn or signUp for next steps such as MFA
  //     }
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //   }
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      console.log("There was an error at sign in", error.message);
    } else {
      console.log("Signing-in with email and password was sucessfull");
    }
    setLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={20}
        keyboardOpeningTime={0}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image
            source={require("../../assets/images/SignInImage.png")}
            style={{
              width: 250,
              height: height * 0.36,
              paddingTop: 0,
              paddingBottom: 10,
            }}
            resizeMode="contain"
          />
          <TextInput
            style={{
              height: 40,
              width: width * 0.8,
              backgroundColor: "#F1F1F1",
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            placeholder="Email"
            placeholderTextColor={"gray"}
            textContentType="none"
            returnKeyType="done"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={{
              height: 0,
              width: width * 0.8,
              backgroundColor: "#F1F1F1",
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            placeholder="Email"
            placeholderTextColor={"white"}
            textContentType="none"
            returnKeyType="done"
          />
          <TextInput
            style={{
              height: 40,
              width: width * 0.8,
              backgroundColor: "#F1F1F1",
              borderRadius: 20,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 20,
            }}
            placeholder="Password"
            placeholderTextColor={"gray"}
            textContentType="password"
            returnKeyType="done"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={{
              backgroundColor: "#CE3535",
              width: width * 0.8,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
            onPress={() => signInWithEmail()}
            disabled={loading}
          >
            <Text
              style={{ color: "#F1F1F1", fontSize: 18, fontWeight: "bold" }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingBottom: 30,
            }}
          >
            <Text style={{}}>Don't have an account? </Text>
            <Pressable onPress={() => router.replace("/(auth)/sign-up")}>
              <Text style={{ color: "#CE3535" }}>Sign up</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
