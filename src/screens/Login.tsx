import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Pressable,
  Keyboard,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useSignUpData } from "../stores/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigation<any>();
  const newEmail = useSignUpData().email;
  const newPassword = useSignUpData().password;

  const handleButtonPress = () => {
    if (newEmail == email && newPassword == password) {
      navigate.navigate("Home");
    } else {
      Alert.alert("아이디 혹은 비밀번호가 틀렸습니다.");
    }
  };
  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <Text style={styles.header}>이메일로 로그인</Text>
      </Pressable>
      <View style={styles.form}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          testID="loginEmail"
          style={styles.input}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          testID="pwdEmail"
          style={styles.input}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>

      <Button text="로그인" onPress={handleButtonPress} disabled={disabled} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    width: "100%",
    padding: 30,
  },
  header: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    paddingTop: 50,
  },
  label: {
    fontWeight: "500",
    fontSize: 17,
    color: "black",
    paddingVertical: 10,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 13,
  },
});

export default Login;
