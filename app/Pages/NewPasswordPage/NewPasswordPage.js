import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { TextInput } from 'react-native';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const { height } = useWindowDimensions();
    const { code, setCode } = useState('');
    const { newPassword, setNewPassword } = useState('');

    const onRegisterPressed = () => {
        console.warn("Register");
    }

    const onSignInPressed = () => {
        console.warn("Sign In");
    }

    const onSendPressed = () => {
        console.warn("Send Email");
    }

    const onBackSignInPressed = () => {
        console.warn("Back to Sign in");
    }

    const onSubmitPressed = () => {
        console.warn("Submit");
    }



    return (
        <ScrollView showVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />

                <Text style={styles.text}> Reset Your Password </Text>

                <Text style={styles.text_sub}> Confirmation Code </Text>
                <CustomInput
                    placeholder="Confirmation Code"
                    value={code}
                    setValue={setCode}
                />

                <Text style={styles.text_sub}> New Password </Text>
                <CustomInput
                    placeholder="Enter Your New Password"
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <Text style={styles.text_sub}> Re-enter New Password </Text>
                <CustomInput
                    placeholder="Re-Enter Your New Password"
                    value={newPassword}
                    setValue={setNewPassword}
                />


                <CustomButton text="SUBMIT" onPress={onSubmitPressed} />

                <CustomButton text="Back To Sign In" onPress={onBackSignInPressed}
                    type="tertiary" />
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

export default ForgotPasswordPage;