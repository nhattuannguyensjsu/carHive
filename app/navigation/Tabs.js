import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Homepage from "../Pages/Homepage/Homepage";
import InboxPage from "../Pages/InboxPage/InboxPage";
import MyListingPage from "../Pages/MyListingPage/MyListingPage";
import PostPage from "../Pages/PostPage/PostPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: -30, justifyContent: "center", alignItems: "center" }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#FFD43C" },
      }}
      tabBarOptions={{
        style: {
          height: 60,
          backgroundColor: "#FFD43C",
        },
      }}
    >
      <Tab.Screen
        name="InboxPage"
        component={InboxPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/chat.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{ fontFamily: "bold" }}> Inbox </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MyListingPage"
        component={MyListingPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/list.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{ fontFamily: "bold" }}> Listings </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Homepage"
        component={Homepage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/home1.png")}
                resizeMode="contain"
                style={{ width: 80, height: 80 }}
              />
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="PostPage"
        component={PostPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/upload.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{ fontFamily: "bold" }}> Post </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/resume.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Text style={{ fontFamily: "bold" }}> Profile </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    textShadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
