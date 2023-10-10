import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, useWindowDimensions, SafeAreaView} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import SignUpButton from '../../components/CustomButton/SignUpButton';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_APP } from "../../../firebaseConfig";
import { ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Modal from "react-native-modal";


const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const auth = FIREBASE_AUTH;

    const { height } = useWindowDimensions();
    const Navigation = useNavigation();
    const SignIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const SignUp = async () => {
        if (email !== '' && password !== '') {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              // Use the user's email as the document ID
              const userDocRef = doc(FIREBASE_DATABASE, "usersInfo", user.email);
              // const signUpCollectionRef = collection(userDocRef, "UserInfo");
              // Set user data in Firestore
              setDoc(userDocRef, {
                name: name,
                email: email,
                password: password,
                // You may not want to store the password in Firestore for security reasons
                // Instead, you can store other user-related data here
              })
                .then(() => {
                  console.log('Data submitted');
                  //Navigation.navigate("SignUpConfirmationPage");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            })
            .catch((err) => {
              console.error("Sign Up Error: ", err.message);
            });
        }
      };

    const onForgotPasswordPressed = () => {
        Navigation.navigate('ForgotPasswordPage');
    }
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleModal = () => setIsModalVisible(() => !isModalVisible);
  
    
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

                <Text> Password </Text>
                <TextInput style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}>
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
    
                <SignUpButton text="Don't have an account? Click here to sign up" onPress={handleModal}/>
                    <Modal
                    isVisible={isModalVisible}>

                    <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.box1}>
                        <View style={styles.root}>
        
        <Text style={styles.text_sub}> SIGN UP </Text>

        <Text> Name </Text>
        <TextInput
          style={styles.input2}
          required
          type="text"
          placeholder="John Smith"
          onChangeText={(text) => setName(text)}
          autoCapitalize="none"
        >

        </TextInput>

        <Text> Email </Text>
        <TextInput
          style={styles.input2}
          required
          type="email"
          placeholder="JohnSmith@gmail.com"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none">
        </TextInput>

        <Text> Password </Text>
        <TextInput
          style={styles.input2}
          required
          type="password"
          placeholder="Must be at least 6 characters"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}>
        </TextInput>

        {loading ? <ActivityIndicator size="large" color="#0000ff" />
          : (
            <>
             

              <SignUpButton
                text="Sign Up" onPress={() => SignUp()}/>

            </>
          )}

        <SignUpButton
          text="Already have an account? Click here to Login" onPress={handleModal} />
  
                    </View>
                    </View>
                    </View>
                    </View>

                  </Modal>
                  
                   
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
        width: '90%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    input2: {
      backgroundColor: 'lightgrey',
      width: '100%',
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 30,
      marginVertical: 10,
  },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    box1:{
    position: 'absolute',
    borderRadius:20,
    width: 320,
    height: 600,
    backgroundColor: 'white',
   
    justifyContent: "center",
    }

});

export default SignInPage;
