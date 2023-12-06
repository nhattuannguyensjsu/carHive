import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, 
    useWindowDimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_APP } from "../../../firebaseConfig";
import { ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const auth = FIREBASE_AUTH;

    const { height } = useWindowDimensions();
    const Navigation = useNavigation();

    const SignIn = async () => {
        setLoading(true);
        const startTime = performance.now(); // Record the start time

        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
            const endTime = performance.now(); // Record the end time
            const elapsedTime = endTime - startTime; // Calculate elapsed time in milliseconds
            console.log(`Sign-in completed in ${elapsedTime} ms`);

        }
    }

    const onSignUpPage = () => {
        Navigation.navigate('SignUpPage');
    }

    const onForgotPasswordPressed = () => {
        Navigation.navigate('ForgotPasswordPage');
    }

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.root}>
                <Image source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />

                <Text style={styles.text}> Welcome Back to CarHive! </Text>
                <Text style={styles.text_sub}> LOGIN </Text>

                <Text > Email </Text>
                <TextInput style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}>
                </TextInput>

                <View style={{ flexDirection: 'row', alignItems: "center"}}>
                <Text> Password </Text>
                <TouchableOpacity style={styles.eye} onPress={toggleShowPassword}>
                <Image
                source={showPassword ? require('../../../assets/icons/eyeoff.png') : require('../../../assets/icons/eye.png')}
                style={styles.eyeIcon}
                />
                </TouchableOpacity>
                </View>

                <TextInput style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword}>
                    </TextInput>

                {loading ? <ActivityIndicator size="large" color="#0000ff" />
                    : (
                        <>
                            {
                                <Text style={{ marginVertical: 10, color: "blue", textDecorationLine: "underline" }}
                                    onPress={onForgotPasswordPressed}> Forgot Password </Text>
                            }

                            {
                                <CustomButton
                                    text="SIGN IN" onPress={() => SignIn()} />
                            }
                        </>
                    )
                }

                <CustomButton
                    text="Dont't have an account? Click here to sign up"
                    onPress={onSignUpPage} />

            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    safe: {
        flex: 1,
        backgroundColor: 'white'
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
    },
    input: {
        backgroundColor: 'lightgrey',
        width: '100%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    eyeIcon: {
        width: 20,
        height: 20,
        marginLeft: 5
      },

});

export default SignInPage;
