import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Tabs } from "./components";


export default Control = () => {
  const token = useSelector((state) => state.token);
console.log("token",token)
  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const credentialJson = await SecureStore.getItemAsync("apple-credentials");
    console.log(credentialJson);
  };

  if (!token.token) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};
