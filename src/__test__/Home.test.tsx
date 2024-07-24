import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
  act,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

//naviagtion
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screend
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import Delivery from "../screens/Delivery";
import Order from "../screens/Order";

jest.mock("../stores/login", () => ({
  useSignUpData: jest.fn(() => ({
    email: "email@email",
    password: "password",
  })),
}));

describe("Home", () => {
  let screen: RenderResult;
  const stack = createStackNavigator();

  const TestApp = () => (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Order" component={Order} />
        <stack.Screen name="Delivery" component={Delivery} />
        <stack.Screen name="Setting" component={Setting} />
      </stack.Navigator>
    </NavigationContainer>
  );

  beforeEach(() => {
    screen = render(<TestApp />);
  });

  test("설정을 눌렀을 때 설정으로 잘 이동하는가?", async () => {
    const settingBtn = screen.getByTestId("setting-btn");

    await act(async () => {
      fireEvent.press(settingBtn);
    });

    await waitFor(() => {
      expect(screen.queryByText("Setting")).toBeTruthy();
    });
  });
  test("배달을 눌렀을 때 배달 페이지로 잘 이동하는가?", async () => {
    const deliveryBtn = screen.getByTestId("delivery-btn");

    await act(async () => {
      fireEvent.press(deliveryBtn);
    });

    await waitFor(() => {
      expect(screen.queryByText("Delivery")).toBeTruthy();
    });
  });
  test("포장을 눌렀을 때 포장 페이지로 잘 이동하는가?", async () => {
    const orderBtn = screen.getByTestId("order-btn");

    await act(async () => {
      fireEvent.press(orderBtn);
    });

    await waitFor(() => {
      expect(screen.queryByText("Order")).toBeTruthy();
    });
  });
});
