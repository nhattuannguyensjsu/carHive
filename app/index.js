import React from "react";
import * as Font from "expo-font";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback } from "react";

import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./Pages/NewPasswordPage/NewPasswordPage";
import Navigation from "./navigation/navigation";
import Tabs from "./navigation/Tabs";
import SignUpConfirmationPage from "./Pages/SignUpConfirmationPage/SignUpConfirmationPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import { SplashScreen } from "expo-router/src/views/Splash";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import Homepage from "./Pages/Homepage/Homepage";
import { NavigationContainer } from "@react-navigation/native";

const Home = () => {
  const [fontsLoaded] = useFonts({
    regular: require("../assets/fonts/Kodchasan-Regular.ttf"),
    light: require("../assets/fonts/Kodchasan-Light.ttf"),
    bold: require("../assets/fonts/Kodchasan-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.text}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: "white",
  },
  textStyles: {
    fontFamily: "regular",
    fontSize: 20,
  },
});

export default Home;
