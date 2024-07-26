import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Keyboard,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useSignUpData } from "../stores/login";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigation<any>();
  const { Signup } = useSignUpData();

  const handleButtonPress = () => {
    if (email.length > 0 && password.length > 0 && repassword.length > 0) {
      const atSymbolPattern = /^[^@]*@[^@]*$/;
      if (atSymbolPattern.test(email)) {
        if (password == repassword) {
          Signup({ email: email, password: password });
          navigate.navigate("Login");
        } else {
          Alert.alert("비밀번호가 일치하지 않습니다.!");
        }
      } else {
        Alert.alert("잘못된 이메일 형식입니다.");
      }
    } else {
      Alert.alert("입력하지 않은 칸이 있습니다.");
    }
  };

  useEffect(() => {
    if (email.length > 0 && password.length > 0 && repassword.length > 0) {
      if (password == repassword) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [email, password, repassword]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <Text style={styles.header}>이메일로 회원가입</Text>
      </Pressable>

      <View style={styles.form}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          testID="emailInput"
          style={styles.input}
          placeholder="이메일을 입력해주세요."
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          testID="passwordInput"
          style={styles.input}
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChangeText={(text) => setPassword(text)}
          // secureTextEntry
          textContentType="none" // 자동 완성 비활성화
          autoComplete="off" // 자동 완성 비활성화
          importantForAutofill="no" // 추가적으로 자동 완성 비활성화
        />
        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          testID="passwordConfirmInput"
          style={[styles.input, { marginBottom: 5 }]}
          placeholder="비밀번호를 한번 더 입력해주세요."
          value={repassword}
          onChangeText={(text) => setRepassword(text)}
          // secureTextEntry
          textContentType="none" // 자동 완성 비활성화
          autoComplete="off" // 자동 완성 비활성화
          importantForAutofill="no" // 추가적으로 자동 완성 비활성화
        />
        {password != repassword && (
          <Text style={styles.error}>비밀번호가 일치하지 않습니다.</Text>
        )}
      </View>

      <Button text="회원가입" onPress={handleButtonPress} disabled={disabled} />
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

export default Signup;
