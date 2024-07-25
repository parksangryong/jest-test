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
import { fetchUserData } from "../api/userData";

jest.mock("../stores/login", () => ({
  useSignUpData: jest.fn(() => ({
    email: "email@email",
    password: "password",
  })),
}));

jest.mock("../api/userData", () => ({
  fetchUserData: jest.fn(() => []),
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
    jest.clearAllMocks();
  });

  afterEach(async () => {
    screen.unmount();
  });

  test("설정을 눌렀을 때 설정으로 잘 이동하는가?", async () => {
    screen = render(<TestApp />);

    const settingBtn = screen.getByTestId("setting-btn");

    await act(async () => {
      fireEvent.press(settingBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("Setting")).toBeTruthy();
    });
  });

  test("배달을 눌렀을 때 배달 페이지로 잘 이동하는가?", async () => {
    screen = render(<TestApp />);

    const deliveryBtn = screen.getByTestId("delivery-btn");

    await act(async () => {
      fireEvent.press(deliveryBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("Delivery")).toBeTruthy();
    });
  });

  test("포장을 눌렀을 때 포장 페이지로 잘 이동하는가?", async () => {
    screen = render(<TestApp />);

    const orderBtn = screen.getByTestId("order-btn");

    await act(async () => {
      fireEvent.press(orderBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("Order")).toBeTruthy();
    });
  });

  //////////

  test("데이터가 하나도 못 불러왔을 때 렌더링이 제대로 되는지?", async () => {
    (fetchUserData as jest.Mock).mockResolvedValueOnce([]);

    screen = render(<TestApp />);

    await waitFor(() => {
      expect(screen.getByText("No data available")).toBeTruthy();
    });
  });

  test("데이터가 1개만 불러왔을 때 total 갯수가 1이 되는지?", async () => {
    (fetchUserData as jest.Mock).mockResolvedValueOnce([
      { id: 1, title: "Test Item", body: "Body1" },
    ]);

    screen = render(<TestApp />);

    await waitFor(() => {
      expect(screen.getByText("UserData(1)")).toBeTruthy();
    });
  });

  test("데이터 불러오는 것에 실패했을 때, Error! 문구가 뜨는지?", async () => {
    (fetchUserData as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch data")
    );

    screen = render(<TestApp />);

    await waitFor(() => {
      expect(screen.getByText("Error!!")).toBeTruthy();
    });
  });
});
