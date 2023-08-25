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
    width: "20%",
    padding: 15,
    marginVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },

  container_primary: {
    backgroundColor: "black",
  },

  text_tertiary: {
    color: "blue",
    textDecorationLine: "underline",
  },

  text: {
    fontWeight: "bold",
    color: "black",
  },
});

export default CustomButton;
