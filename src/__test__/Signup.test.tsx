import {
  RenderResult,
  act,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import { Alert } from "react-native";

describe("회원가입 테스트", () => {
  let screen: RenderResult;
  const Stack = createStackNavigator();

  const TestApp = () => (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  beforeEach(() => {
    jest.clearAllMocks(); //모든 모의 함수 초기화
    screen = render(<TestApp />);
  });

  test("비밀번호와 비밀번호 확인 값이 일치하지 않으면 에러메시지 표시된다.", async () => {
    //when - 비밀번호와 비밀번호 확인 값 일치하지 않음
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요.");
    const rePassword =
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요.");

    await act(async () => {
      fireEvent.changeText(password, "password");
      fireEvent.changeText(rePassword, "rePassword");
    });

    //then - 에러 메시지 표시됨
    const errorMessage = await screen.findByText(
      "비밀번호가 일치하지 않습니다."
    );
    expect(errorMessage).toBeTruthy();
  });

  test("이메일을 입력하고, 비밀번호와 비밀번호 확인값이 일치할 경우 버튼이 활성화된다", async () => {
    //when - 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const email = screen.getByPlaceholderText("이메일을 입력해주세요.");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요.");
    const rePassword =
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요.");

    await act(async () => {
      fireEvent.changeText(email, "email@email");
      fireEvent.changeText(password, "password");
      fireEvent.changeText(rePassword, "password");
    });

    //then - 회원가입 버튼 활성화상태
    const signupBtn = screen.getByText("회원가입");
    await waitFor(() => {
      expect(signupBtn).toBeEnabled();
    });
  });

  test("이메일에 @이 없고 비밀번호와 비밀번호 확인값이 일치할 경우 버튼을 클릭 후 경고 Alert이 뜬다.", async () => {
    // Alert.alert를 모의 함수로 설정
    jest.spyOn(Alert, "alert");
    //when - 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const email = screen.getByPlaceholderText("이메일을 입력해주세요.");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요.");
    const rePassword =
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요.");

    await act(async () => {
      fireEvent.changeText(email, "email");
      fireEvent.changeText(password, "password");
      fireEvent.changeText(rePassword, "password");
    });

    const signupBtn = screen.getByText("회원가입");
    await act(async () => {
      fireEvent.press(signupBtn);
    });
    //then - 회원가입 버튼 클릭시 경고창 뜬다.
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("잘못된 이메일 형식입니다.");
    });
  });

  test("이메일과 비밀번호들을 제대로 입력 후 버튼을 클릭하면 Login화면으로 이동한다.", async () => {
    //when - 이메일 입력, 비밀번호, 비밀번호 확인 일치
    const email = screen.getByPlaceholderText("이메일을 입력해주세요.");
    const password = screen.getByPlaceholderText("비밀번호를 입력해주세요.");
    const rePassword =
      screen.getByPlaceholderText("비밀번호를 한번 더 입력해주세요.");

    await act(async () => {
      fireEvent.changeText(email, "email@email");
      fireEvent.changeText(password, "password");
      fireEvent.changeText(rePassword, "password");
    });

    const signupBtn = screen.getByText("회원가입");
    await act(async () => {
      fireEvent.press(signupBtn);
    });
    //thten - 회원가입 버튼 클릭시 로그인 페이지로 이동
    await waitFor(() => {
      expect(screen.queryByText("이메일로 로그인")).toBeTruthy();
    });
  });
});
