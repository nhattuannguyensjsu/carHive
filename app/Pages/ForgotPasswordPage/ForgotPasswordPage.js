import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const onSendPressed = () => {
        console.warn("Send Email");
    }

    const onBackSignInPressed = () => {
        Navigation.navigate('SignInPage');
    }
    
    const onNewPassword = () => {
        Navigation.navigate('NewPasswordPage');
    }


    return (
        <SafeAreaView style = {styles.safe}>
            <View style={styles.root}>
                <Image source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />

                <Text style={styles.text}> Reset Your Password </Text>

                <Text style={styles.text_sub}> Email </Text>
                <TextInput style={styles.input}
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />

                <CustomButton text="Send Code" onPress={onSendPressed} />
                <CustomButton text="Change New Password" onPress={onNewPassword} />

                <Text style={{ color: "blue", textDecorationLine: "underline" }}
                    onPress={onBackSignInPressed}> Back To Sign In
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    safe:{
        flex: 1,
        backgroundColor: 'white'
    },
    logo: {
        width: '60%',
        maxWidth: 300,
        maxHeight: 200,
    },
    input: {
        backgroundColor: 'lightgrey',
        width: '90%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
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

export default ForgotPasswordPage;