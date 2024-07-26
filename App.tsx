import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Signup from "./src/screens/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Delivery from "./src/screens/Delivery";
import Order from "./src/screens/Order";
import Setting from "./src/screens/Setting";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const stack = createStackNavigator<any>();
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name="Signup" component={Signup} />
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Order" component={Order} />
        <stack.Screen name="Delivery" component={Delivery} />
        <stack.Screen name="Setting" component={Setting} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
