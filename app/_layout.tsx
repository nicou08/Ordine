import "react-native-url-polyfill/auto";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { Session } from "@supabase/supabase-js";

import {
  SplashScreen,
  Stack,
  router,
  usePathname,
  useLocalSearchParams,
} from "expo-router";
import SignHeader from "../components/headers/SignHeader";
import RestaurantHeader from "../components/headers/RestaurantHeader";
import SettingsHeader from "../components/headers/SettingsHeader";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/(auth)/welcome",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log("HELLOO", session);

  useEffect(() => {
    if (session && session.user) {
      router.replace("/(tabs)/home");
    } else {
      router.replace("/(auth)/welcome");
    }
  }, [session, router]);

  return (
    <>
      {session != null && session.user ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(screens)/store/[restaurant]"
            options={{
              header: () => <RestaurantHeader />,
            }}
          />
          <Stack.Screen
            name="(screens)/settings/index"
            options={{
              header: () => <SettingsHeader title="Settings" />,
            }}
          />
          <Stack.Screen
            name="(screens)/settings/Preferences"
            options={{
              header: () => <SettingsHeader title="Preferences" />,
            }}
          />
          <Stack.Screen
            name="(screens)/settings/Security"
            options={{
              header: () => <SettingsHeader title="Security" />,
            }}
          />
          <Stack.Screen
            name="(screens)/settings/TermsOfUse"
            options={{
              header: () => <SettingsHeader title="Terms of Use" />,
            }}
          />
          <Stack.Screen
            name="(screens)/settings/Privacy"
            options={{
              header: () => <SettingsHeader title="Privacy" />,
            }}
          />
          <Stack.Screen
            name="(screens)/settings/HelpCenter"
            options={{
              header: () => <SettingsHeader title="Help Center" />,
            }}
          />
          <Stack.Screen
            name="SignOutModal"
            options={{ presentation: "modal" }}
          />
        </Stack>
      ) : (
        <Stack initialRouteName="(auth)/welcome">
          <Stack.Screen
            name="(auth)/welcome"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(auth)/sign-in"
            options={{
              header: () => <SignHeader title="Sign In" />,
            }}
          />
          <Stack.Screen
            name="(auth)/sign-up"
            options={{
              header: () => <SignHeader title="Sign Up" />,
            }}
          />
        </Stack>
      )}
    </>
  );
}
