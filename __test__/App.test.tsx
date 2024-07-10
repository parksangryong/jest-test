import React from "react";
import "react-native";
import { render, screen } from "@testing-library/react-native";
import App from "../App";

describe("App", () => {
  it("has 1 child", () => {
    const screens = render(<App />);
    const json = screens.toJSON();
    expect(json).toMatchSnapshot();
  });
});
