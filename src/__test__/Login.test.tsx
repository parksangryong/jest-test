import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RenderResult,
  act,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { Alert } from "react-native";

jest.mock("../stores/login", () => ({
  useSignUpData: jest.fn(() => ({
    email: "email@email",
    password: "password",
  })),
}));

describe("로그인 테스트", () => {
  let screen: RenderResult;
  const Stack = createStackNavigator();

  const TestApp = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  beforeEach(() => {
    jest.clearAllMocks(); //모든 모의 함수 초기화
    jest.spyOn(Alert, "alert"); // Alert.alert를 모의 함수로 설정
    screen = render(<TestApp />);
  });

  test("로그인에 실패하면 Alert가 나타난다.", async () => {
    const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요.");
    const pwdInput = screen.getByPlaceholderText("비밀번호를 입력해주세요.");

    await act(async () => {
      fireEvent.changeText(emailInput, "email@email");
      fireEvent.changeText(pwdInput, "password22");
    });

    const loginBtn = screen.getByText("로그인");
    await act(async () => {
      fireEvent.press(loginBtn);
    });

    // zustand 값과 비교해서 alert 띄우는지 확인
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "아이디 혹은 비밀번호가 틀렸습니다."
      );
    });
  });

  test("로그인이 zustand 값과 일치하면 Home으로 이동한다.", async () => {
    const emailInput = screen.getByPlaceholderText("이메일을 입력해주세요.");
    const pwdInput = screen.getByPlaceholderText("비밀번호를 입력해주세요.");

    await act(async () => {
      fireEvent.changeText(emailInput, "email@email");
      fireEvent.changeText(pwdInput, "password");
    });

    const loginBtn = screen.getByText("로그인");
    await act(async () => {
      fireEvent.press(loginBtn);
    });

    // zustand 값과 비교해서 Home으로 이동
    await waitFor(() => {
      expect(screen.queryByText("이메일로 로그인")).toBeNull();
      expect(screen.queryByText("Home")).toBeTruthy();
    });
  });
});
