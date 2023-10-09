import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const { height } = useWindowDimensions();
    const { code, setCode } = useState('');
    const { newPassword, setNewPassword } = useState('');

    const Navigation = useNavigation();

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
    Navigation.navigate("SignInPage")
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
                <TextInput style={styles.input}
                    placeholder="Confirmation Code"
                    value={code}
                    setValue={setCode}
                />

                <Text style={styles.text_sub}> New Password </Text>
                <TextInput style={styles.input}
                    placeholder="Enter Your New Password"
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <Text style={styles.text_sub}> Re-enter New Password </Text>
                <TextInput style={styles.input}
                    placeholder="Re-Enter Your New Password"
                    value={newPassword}
                    setValue={setNewPassword}
                />


                <CustomButton text="SUBMIT" onPress={onSubmitPressed} />

                <Text style={{ marginVertical: 10, color: "blue", textDecorationLine: "underline" }}
                onPress={onBackSignInPressed}
                    type="tertiary"> Back To Sign In </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
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
        marginVertical: 5,
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