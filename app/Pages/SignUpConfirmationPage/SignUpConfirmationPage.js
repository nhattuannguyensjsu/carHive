import React, { useState } from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';

const SignUpConfirmationPage = () => {
    const Navigation = useNavigation();
    const { height } = useWindowDimensions();

    return (

            <View style={styles.root}>
                <Image source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Thank You for the Registration! </Text>
                <CustomButton
                    onPress={() => Navigation.navigate("SignInPage")} text="Back To Sign In" />

            </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        marginTop: 100,
        width: '60%',
        maxWidth: 300,
        maxHeight: 200,
    },
    text: {
        fontSize: 20,
        marginTop: 20,
    },
});

export default SignUpConfirmationPage;

