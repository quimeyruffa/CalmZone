import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Yup from "yup";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Form } from "../../components";
import { COLOR, ROUTES } from "../../constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SVGComponentRegister from "./registerSVG";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  LastName: Yup.string().required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(8).required("Please enter your password."),
});
const objInitialValues = {
  firstName: "",
  LastName: "",
  email: "",
  password: "",
  profilePictureUrl: "google.com",
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
    name: "LastName",
    placeholder: "Apellido",
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
  const sendData = async (values) => {
    const val = JSON.parse(values);
    await fetch(
      "http://ec2-54-211-47-153.compute-1.amazonaws.com:3000/api/v1.1/auth/signup",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: val.firstName,
          lastName: val.LastName,
          email: val.email,
          password: val.password,
          profilePictureUrl: "google.com",
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
        <SVGComponentRegister />
        <View>
          <Text style={styles.title}>Registrarse</Text>
          <Form
            event={sendData}
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
