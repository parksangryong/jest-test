import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSignUpData } from "../stores/login";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faGear,
  faPersonWalkingLuggage,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigation<any>();
  const newEmail = useSignUpData().email;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{newEmail} 님</Text>
        <TouchableOpacity
          testID="setting-btn"
          onPress={() => {
            navigate.navigate("Setting");
          }}
        >
          <FontAwesomeIcon icon={faGear} size={16} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        testID="delivery-btn"
        style={styles.box}
        onPress={() => {
          navigate.navigate("Delivery");
        }}
      >
        <FontAwesomeIcon icon={faTruck} size={18} color="black" />

        <Text style={styles.text}>배달</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="order-btn"
        style={styles.box}
        onPress={() => navigate.navigate("Order")}
      >
        <FontAwesomeIcon
          icon={faPersonWalkingLuggage}
          size={20}
          color="black"
        />
        <Text style={styles.text}>포장</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
  },
  box: {
    flex: 1,
    borderWidth: 1,
    maxHeight: 60,
    marginBottom: 10,
    justifyContent: "flex-start",
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#ffffff",
  },
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    bottom: 2.5,
  },
  name: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "right",
    bottom: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 5,
    gap: 5,
    marginBottom: 15,
  },
});

export default Home;
