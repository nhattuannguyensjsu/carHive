import React, {useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignUpPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const {height} = useWindowDimensions();
    const Navigation = useNavigation();
    
    const onRegisterPressed = () => {
        Navigation.navigate('SignUpConfirmationPage');
    }

    const onSignInPressed = () => {
        Navigation.navigate('SignInPage');
    }

    return (
        <ScrollView showVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Image source={Logo} 
            style={[styles.logo, {height: height*0.3}]} 
            resizeMode="contain" 
            />
       
            <Text style={styles.text}> Welcome to CarHive! </Text>
            <Text style={styles.text_sub} > SIGN UP </Text>
            <Text> Name </Text>
            <CustomInput 
                placeholder="Name" 
                value={name} 
                setValue={setName} 
            />
            <Text> Email </Text>
            <CustomInput 
                placeholder="Email" 
                value={email} 
                setValue={setEmail} 
            />
            <Text> Password </Text>
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword} 
                secureTextEntry  
            />
            <Text> Re-enter Password </Text>
            <CustomInput 
                placeholder="passwordRepeat" 
                value={passwordRepeat} 
                setValue={setPasswordRepeat} 
                secureTextEntry
            />

            <CustomButton text="Register" onPress={onRegisterPressed} />

            <Text style={{color:"blue", textDecorationLine: "underline", fontWeight: "bold"}} 
            onPress={onSignInPressed}> Already have an account? Click here to Login </Text>
                 

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
        margin: 1,
        fontWeight: 'bold'
    },
    text_sub: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold'
    }
    
});

export default SignUpPage;