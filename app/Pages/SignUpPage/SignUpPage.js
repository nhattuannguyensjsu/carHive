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
} from "react-native";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../../firebaseConfig";
import { ActivityIndicator } from 'react-native-web';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const Navigation = useNavigation();

  const SignUp = async () => {

    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert('Sucessfullt registered!!!'))
        .catch((err) => alert("Sign Up Error!!!", err.message));
    }
  };



  return (
    <ScrollView showVerticalScrollIndicator={false}>
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
          placeholder="mail"
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
              <Text style={{
                marginVertical: 10, color: "blue",
                textDecorationLine: "underline"
              }} > Forgot Password </Text>

              <CustomButton
                text="Sign Up" onPress={() => SignUp()} />


            </>
          )}

        <CustomButton
          title="Already have an account? Click here to Login"
          onPress={() => Navigation.navigate("SignInPage")} />


      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
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