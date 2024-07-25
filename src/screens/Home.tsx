import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

// store
import { useSignUpData } from "../stores/login";

// package
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faGear,
  faPersonWalkingLuggage,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

// components
import BodyInfo from "../components/BodyInfo";

// api
import { fetchUserData } from "../api/userData";

const Home = () => {
  const navigate = useNavigation<any>();
  const newEmail = useSignUpData().email;

  const [user, setUser] = useState<any>([]);
  const [error, setError] = useState(false);

  const getUserData = async () => {
    try {
      const response = await fetchUserData();
      console.log(response.length);
      setUser(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <ScrollView>
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
        <Text style={styles.title}>UserData({user.length})</Text>
        {error ? (
          <Text>Error!!</Text>
        ) : user[0] === undefined ? (
          <Text>No data available</Text>
        ) : (
          <View>
            {user.map((item: any, index: number) => (
              <BodyInfo
                id={item.id}
                title={item.title}
                body={item.body}
                key={index}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
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
    minHeight: 60,
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
  title: {
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
