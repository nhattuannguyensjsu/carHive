import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: [e.target.value] });
  };

  console.log(inputs);

  const { height } = useWindowDimensions();
  const Navigation = useNavigation();

  const onRegisterPressed = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        inputs,
      });
      console.log(res);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const onSignInPressed = () => {
    Navigation.navigate("SignInPage");
  };

  return (
    <div className="auth">
      <ScrollView showVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <Text style={styles.text}> Welcome to CarHive! </Text>
          <Text style={styles.text_sub}> SIGN UP </Text>
          <Text> Name </Text>
          <input
            style={styles.input}
            required
            type="text"
            placeholder="name"
            name="name"
            onChange={handleChange}
          />
          <Text> Email </Text>
          <input
            style={styles.input}
            required
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <Text> Password </Text>
          <input
            style={styles.input}
            required
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          {/* <Text> Re-enter Password </Text>
        <CustomInput
          required
          placeholder="passwordRepeat"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        /> */}
          <button style={styles.button} onClick={onRegisterPressed}>
            {" "}
            Register{" "}
          </button>

          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
            onPress={onSignInPressed}
          >
            {" "}
            Already have an account? Click here to Login{" "}
          </Text>
        </View>
      </ScrollView>
    </div>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  input: {
    backgroundColor: "lightgrey",
    width: "50%",
    height: 25,
    borderWidth: 0,
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
    margin: 10,
  },

  button: {
    margin: 10,
    backgroundColor: "#FFD43C",
    width: "20%",
    padding: 10,
    marginVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },

  logo: {
    width: "60%",
    maxWidth: 300,
    maxHeight: 200,
  },
  text: {
    fontSize: 25,
    margin: 1,
    fontWeight: "bold",
  },
  text_sub: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
});

export default SignUpPage;
