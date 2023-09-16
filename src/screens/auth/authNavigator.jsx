
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ROUTES } from "../../constants";
import { ForgotPassword, Login, Register } from "..";

const Stack = createNativeStackNavigator();
export default AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.LOGIN}>
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register} />
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
    </Stack.Navigator>
  );
};
