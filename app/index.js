import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image, TouchableOpacity
} from "react-native";

import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./Pages/NewPasswordPage/NewPasswordPage";
import Navigation from "./navigation/navigation";
import Tabs from "./navigation/Tabs";
import SignUpConfirmationPage from "./Pages/SignUpConfirmationPage/SignUpConfirmationPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import Homepage from "./Pages/Homepage/Homepage";
import InboxPage from "./Pages/InboxPage/InboxPage";
import MyListingPage from "./Pages/MyListingPage/MyListingPage";
import PostPage from "./Pages/PostPage/PostPage";
import FeedbackPage from "./Pages/FeedbackPage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useState } from "react";
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_APP, FIREBASE_DATABASE } from "../firebaseConfig";
import UploadIDPage from "./Pages/UploadIDPage/UploadIDPage";


const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Welcome() {
  return (
    <SafeAreaView style={styles.text}>
      <InsideStack.Navigator initialRouteName="WelcomePage">
        <InsideStack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
        <InsideStack.Screen name="SignInPage" component={SignInPage} options={{ headerShown: false }} />
        <InsideStack.Screen name="SignUpConfirmationPage" component={SignUpConfirmationPage} options={{ headerShown: false }} />
      </InsideStack.Navigator>
    </SafeAreaView>
  )
}

function InsideLayout() {
  return (
    <SafeAreaView style={styles.text}>
      <InsideStack.Navigator>
        <InsideStack.Screen name="HomepageNavi" component={HomepageNavi} options={{ headerShown: false }} />
      </InsideStack.Navigator>
    </SafeAreaView>
  )
}

export default function Home() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaView style={styles.text}>
      <NavigationContainer independent={true}>

        <Stack.Navigator initialRouteName='SignInPage'>

          {user ? (
            <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name='SignInPage' component={SignInPage} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="UploadIDPage" component={UploadIDPage} options={{ headerShown: false }} />
          <Stack.Screen name="SignUpConfirmationPage" component={SignUpConfirmationPage} options={{ headerShown: false }} />
          <Stack.Screen name='SignUpPage' component={SignUpPage} options={{ headerShown: false }} />
          <Stack.Screen name='ForgotPasswordPage' component={ForgotPasswordPage} options={{ headerShown: false }} />

        </Stack.Navigator>

      </NavigationContainer>

    </SafeAreaView>

  );
}

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: -20, justifyContent: "center", alignItems: "center" }}
    onPress={onPress}>
    <View style={{
      width: 50, height: 50, borderRadius: 20,
    }}>
    </View>
  </TouchableOpacity>
);

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#FFD43C"
  }
}

function HomepageNavi() {
  return (
    <SafeAreaView style={styles.text}>
      <Tab.Navigator initialRouteName="Homepage" screenOptions={screenOptions} >
        <Tab.Screen
          name="FeedbackPage"
          component={FeedbackPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../assets/icons/chat.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {/* <Text style={{ fontFamily: "bold" }}> Inbox </Text> */}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="MyListingPage"
          component={MyListingPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../assets/icons/list.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {/* <Text style={{ fontFamily: "bold" }}> Listings </Text> */}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Homepage"
          component={Homepage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../assets/icons/bee-hive.png")}
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                />
              </View>
            ),
            // tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />

        <Tab.Screen
          name="PostPage"
          component={PostPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../assets/icons/upload.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {/* <Text style={{ fontFamily: "bold" }}> Post </Text> */}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../assets/icons/edit.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                {/* <Text style={{ fontFamily: "bold" }}> Profile </Text> */}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: "white",
  },
  textStyles: {
    fontSize: 20,
  },
});

