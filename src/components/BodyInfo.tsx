import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BodyInfo = ({ id, title, body }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.id}>{id}</Text>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  id: {
    width: 30,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
  },
  body: {
    fontSize: 10,
  },
});

export default BodyInfo;
