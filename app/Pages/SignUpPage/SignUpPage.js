import React, { useState, Component, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Logo from "../../../assets/images/logo.png";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { ActivityIndicator } from 'react-native-web';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";


const SignUpPage = () => {

  const Navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const auth = FIREBASE_AUTH;

  const onForgotPasswordPressed = () => {
    Navigation.navigate('ForgotPasswordPage');
  }

  const SignUp = async () => {
    if (email !== '' && password !== '') {
      console.log('Starting sign-up...');
      const startTime = new Date().getTime();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userDocRef = doc(FIREBASE_DATABASE, "usersInfo", user.email);
          setDoc(userDocRef, {
            name: name,
            email: email,
            password: password,
          })
            .then(() => {
              const endTime = new Date().getTime(); 
              const elapsedTime = endTime - startTime; 
              console.log(`Sign-up completed in ${elapsedTime} ms`);

              console.log('Data submitted');
              Navigation.navigate("SignUpConfirmationPage");
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



  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <Image source={Logo} style={[styles.logo]} resizeMode="contain" />
        <Text style={styles.text}> Welcome to CarHive! </Text>
        <Text style={styles.text_sub}> SIGN UP </Text>

        <Text> Name </Text>
        <TextInput
          style={styles.input}
          required
          type="text"
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          autoCapitalize="none"
        >

        </TextInput>

        <Text> Email </Text>
        <TextInput
          style={styles.input}
          required
          type="email"
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none">
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

        
        <TextInput
          style={styles.input}
          required
          type="password"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={!showPassword}>
        </TextInput>
        

        {loading ? <ActivityIndicator size="large" color="#0000ff" />
          : (
            <>
              <Text style={{ marginVertical: 10, color: "blue", textDecorationLine: "underline" }}
                onPress={onForgotPasswordPressed}> Forgot Password </Text>

              <CustomButton
                text="Sign Up" onPress={() => SignUp()} />


            </>
          )}

        <CustomButton
          text="Already have an account? Click here to Login"
          onPress={() => Navigation.navigate("SignInPage")} />


      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  safe: {
    flex: 1,
    backgroundColor: 'white'
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

  logo: {
    width: "60%",
    maxWidth: 300,
    maxHeight: 200,
  },
  text: {
    fontSize: 25,
    margin: 1,
  },
  text_sub: {
    fontSize: 20,
    margin: 10,
  },
  eyeIcon: {
    width: 20,
    height: 20,
  },
 
    

});

export default SignUpPage;