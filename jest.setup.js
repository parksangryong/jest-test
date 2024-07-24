import "react-native-gesture-handler/jestSetup";
import "@testing-library/jest-native/extend-expect";

jest.mock("react-native-gesture-handler", () => {
  const React = require("react");
  const { View } = require("react-native");
  const ActualGestureHandler = jest.requireActual(
    "react-native-gesture-handler"
  );

  return {
    ...ActualGestureHandler,
    GestureHandlerRootView: ({ children }) => children,
    PanGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    TapGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    FlingGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    ForceTouchGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    LongPressGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    NativeViewGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    PinchGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
    RotationGestureHandler: React.forwardRef(({ children }, ref) => (
      <View ref={ref}>{children}</View>
    )),
  };
});

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  Reanimated.default.call = () => {};

  return Reanimated;
});
