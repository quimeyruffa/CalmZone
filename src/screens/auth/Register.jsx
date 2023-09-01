import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Yup from "yup";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Form } from "../../components";
import { COLOR, ROUTES } from "../../constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8)
    .required("Please enter your password.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Must contain minimun 8 characters,one number, at least one uppercase/undercasse letter, one special character"
    ),
  mobile: Yup.string()
    .min(10, "Must be ten digits")
    .max(10, "Must be ten digits")
    .required("Please enter your mobile number.")
    .matches(/ ^[0-9]+$/, "Must be only digits"),
});
const objInitialValues = {
  firstName: "",
  email: "",
  password: "",
  mobile: "",
};
const inputValues = [
  {
    name: "firstName",
    placeholder: "Nombre",
    icon: (
      <Ionicons
        name="person-outline"
        size={24}
        color="#090A0A"
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      />
    ),
  },
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
  {
    name: "mobile",
    placeholder: "Telefono",
    icon: (
      <Feather
        name="phone"
        size={24}
        color="black"
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      />
    ),
  },

  {
    name: "password",
    placeholder: "Password",
    icon: (
      <Feather
        name="unlock"
        size={24}
        color="black"
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      />
    ),
  },
];

export default Register = ({ navigation }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate(ROUTES.LOGIN)}
      >
        <Ionicons
          name="arrow-back-circle-sharp"
          size={40}
          color={COLOR.primary}
        />
      </TouchableOpacity>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Registrarse</Text>
          <Form
            objInitialValues={objInitialValues}
            inputValues={inputValues}
            schema={SignupSchema}
            textButton="Crear Cuenta"
            width={171}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    position: "relative",
    marginBottom: 20,
  },
  arrowButton: {
    paddingTop: 20,
    paddingLeft: 30,
    backgroundColor: "#fff",
  },
});