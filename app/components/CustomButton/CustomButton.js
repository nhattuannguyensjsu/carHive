import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}> {text} </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFD43C",
    width: "100%",
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
    textAlign: "center"
  },

  container_primary: {
    backgroundColor: "black",
  },

  text_tertiary: {
    color: "blue",
    textDecorationLine: "underline",
  },

  text: {
    color: "black",
  },
});

export default CustomButton;
