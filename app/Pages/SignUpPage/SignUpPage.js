import React, {useState} from 'react';
import {ScrollView, View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
const SignUpPage = () => {

    const [inputs, setInputs] = useState({
        name:"",
        email:"",
        password:"",
    })

    const handleChange =  e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }


    const [passwordRepeat, setPasswordRepeat] = useState('');
    const {height} = useWindowDimensions();
    const Navigation = useNavigation();
    
    const onRegisterPressed = async e => {
        e.preventDefault()
        try { 
            const res = await axios.post("/auth/register", inputs)
            console.log(res)
        } catch(err) {
            console.log(res)
        }

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
            <CustomInput required
                placeholder="name" 
                type="text"
                name='name' 
                onChange={handleChange}
            />
            <Text> Email </Text>
            <CustomInput required
                placeholder="email" 
                type="email"
                name='email' 
                onChange={handleChange}

            />
            <Text> Password </Text>
            <CustomInput required
                placeholder="password" 
                type="password"
                name='password'
                secureTextEntry  
                onChange={handleChange}

            />
            <Text> Re-enter Password </Text>
            <CustomInput required
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