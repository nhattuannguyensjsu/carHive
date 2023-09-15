import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const WelcomePage = () => {


  const { height } = useWindowDimensions();

  const Navigation = useNavigation();

  const onSignInPressed = () => {
    Navigation.navigate('SignInPage');
  }

  return (

    <View style={styles.root}>
      <Image source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />
      <Text style={styles.text}> CarHive </Text>

      <CustomButton text="Get Started" onPress={onSignInPressed} />

    </View>
  );

};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#49330F",

  },
  logo: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 300,
    backgroundColor: "#49330F",


  },
  text: {
    fontSize: 60,
    margin: 10,
    color: "#FAC503",


  },


});

export default WelcomePage;