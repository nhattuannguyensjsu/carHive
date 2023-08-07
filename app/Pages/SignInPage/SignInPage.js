import React, {useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Tabs from '../../navigation/Tabs';

const SignInPage = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {height} = useWindowDimensions();
    const Navigation = useNavigation();


    const onSignInPressed = () => {
        Navigation.navigate('Homepage');
    }

    const onForgotPasswordPressed = () => {
        Navigation.navigate('ForgotPasswordPage');
    }
    const onSignupPressed = () => {
        Navigation.navigate('SignUpPage');
    }

    const onHomePressed = () => {
        Navigation.navigate('Homepage');
    }

    return (
        <ScrollView showVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image source={Logo} 
            style={[styles.logo, {height: height*0.3}]} 
            resizeMode="contain" 
            />
       
            <Text style={styles.text}> Welcome Back to CarHive! </Text>
            <Text style={styles.text_sub}> LOGIN </Text>
            <Text > Email </Text>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} />
            <Text> Password </Text>
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry={true}     
            />
            <Text style={{color:"blue", textDecorationLine: "underline", fontWeight: "bold"}} 
            onPress={onForgotPasswordPressed}> Forgot Password </Text>
                 
            <CustomButton text="Sign In" onPress={onSignInPressed} />

            <Text style={{color:"blue", textDecorationLine: "underline", fontWeight: "bold"}} 
            onPress={onSignupPressed}> Dont't have an account? Click here to sign up 
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
        fontWeight: 'bold'
    },
    text_sub: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold'
    }
    
});

export default SignInPage;
