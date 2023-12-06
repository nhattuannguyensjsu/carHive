import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInPage from "../Pages/SignInPage/SignInPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "../Pages/NewPasswordPage/NewPasswordPage";
import WelcomePage from "../Pages/WelcomePage/WelcomePage";
import SignUpConfirmationPage from "../Pages/SignUpConfirmationPage/SignUpConfirmationPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Homepage from "../Pages/Homepage/Homepage";
import UploadIDPage from "../Pages/UploadIDPage/UploadIDPage";
import ListingPage from "../Pages/ListingPage";
import VINsearchPage from "../Pages/VINsearchPage";
import FeedbackPage from "../Pages/FeedbackPage";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
        <Stack.Screen name="NewPasswordPage" component={NewPasswordPage} />
        <Stack.Screen name="SignUpConfirmationPage" component={SignUpConfirmationPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="UploadIDPage" component={UploadIDPage} />
        <Stack.Screen name="ListingPage" component={ListingPage} />
        <Stack.Screen name="VINsearchPage" component={VINsearchPage} />
        <Stack.Screen name="FeedbackPage" component={FeedbackPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
