import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';


const SignUpConfirmationPage = () => {

    const Navigation = useNavigation();
    const { height } = useWindowDimensions();

    const onBackSignInPressed = () => {
        Navigation.navigate('SignInPage');
    }


    return (

        <ScrollView showVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />
                <Text style={styles.text}>Thank You for the Registration! </Text>
                <Text style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={onBackSignInPressed}> Back To Sign In
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '60%',
        maxWidth: 300,
        maxHeight: 200,
    },
    text: {
        fontSize: 25,
        margin: 10,
    },
    text_sub: {
        fontSize: 20,
        margin: 10,
    }

});

export default SignUpConfirmationPage;

