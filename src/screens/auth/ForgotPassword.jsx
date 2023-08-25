import { View, StyleSheet } from "react-native";
import React from "react";
import * as Yup from "yup";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Form } from "../../components";

const SignupSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});
const objInitialValues = {
  email: "",
};
const inputValues = [
  {
    name: "email",
    placeholder: "Email",
    icon: (
      <AntDesign
        name="mail"
        size={24}
        color="#090A0A"
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      />
    ),
  },
];

export default ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Form
        objInitialValues={objInitialValues}
        inputValues={inputValues}
        schema={SignupSchema}
        textButton="Guardar"
        width={327}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
