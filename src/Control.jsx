import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Tabs } from "./components";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Asyncstorage: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default Control = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const credentials = await SecureStore.getItemAsync("apple-credentials");
    const user = await SecureStore.getItemAsync("user_data");
    if (credentials && user) {
      console.log("llegue",credentials)
      dispatch(tokenSlice.actions.save(JSON.parse(credentials)));
      dispatch(userSlice.actions.save(JSON.parse(user)));
    }
  };

 

  if (!token?.token) {
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
