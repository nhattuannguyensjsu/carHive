import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInPage from "../Pages/SignInPage/SignInPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import ForgotPasswordPage from "../Pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "../Pages/NewPasswordPage/NewPasswordPage";
import WelcomePage from '../Pages/WelcomePage/WelcomePage';
import SignUpConfirmationPage from '../Pages/SignUpConfirmationPage/SignUpConfirmationPage';
import ProfilePage from '../Pages/ProfilePage/ProfilePage';
import Homepage  from '../Pages/Homepage/Homepage';
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
      <Stack.Navigator 
      screenOptions={{headerShown: false}}>
      
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
        <Stack.Screen name="NewPasswordPage" component={NewPasswordPage} />
        <Stack.Screen name="SignUpConfirmationPage" component={SignUpConfirmationPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Homepage" component={Homepage} />



      </Stack.Navigator>
    
  );

};

