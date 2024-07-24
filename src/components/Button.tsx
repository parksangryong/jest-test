import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ text, onPress, disabled }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.box, disabled && { backgroundColor: "#333333" }]}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && { color: "grey" }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    minWidth: 300,
    maxHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    marginBottom: 30,
  },
  text: {
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
});

export default Button;
