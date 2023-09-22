import React, { useState, Component, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
  Button,
  SafeAreaView,
} from "react-native";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DATABASE } from "../../../firebaseConfig";
import { ActivityIndicator } from 'react-native-web';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";


const SignUpPage = () => {

  const Navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const onForgotPasswordPressed = () => {
    Navigation.navigate('ForgotPasswordPage');
}

  // const SignUp = async () => {
  //   setDoc(doc(FIREBASE_DATABASE, "users", "usersInfo"), {
  //     name: name,
  //     email: email,
  //     password: password,
  //   }).then(() => {
  //     console.log('Data submitted');
  //   }).catch((error) => {
  //     console.log(error);
  //   })

  //   if (email !== '' && password !== '') {
  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then(() => Navigation.navigate("SignUpConfirmationPage"))
  //       .catch((err) => alert("Sign Up Error!!!", err.message));
  //   }
  // };

  const SignUp = async () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // Use the user's email as the document ID
          const userDocRef = doc(FIREBASE_DATABASE, "users", user.email);

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
    <SafeAreaView style = { styles.safe}> 
    {/* <ScrollView showVerticalScrollIndicator={false}> */}
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

        <Text> Password </Text>
        <TextInput
          style={styles.input}
          required
          type="password"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry={true}>
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
    {/* </ScrollView> */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  safe:{
    flex: 1,
    backgroundColor: 'white'
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
});

export default SignUpPage;