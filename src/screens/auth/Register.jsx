import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import * as Yup from "yup";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Form } from "../../components";
import { COLOR, ROUTES } from "../../constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SVGComponentRegister from "./registerSVG";

import Toast from "react-native-toast-message";

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
    try {
      const apiUrl =
        "http://ec2-18-209-99-116.compute-1.amazonaws.com:3000/api/v1.1/auth/signup";

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: val.firstName,
          lastName: val.LastName,
          email: val.email,
          password: val.password,
          profilePictureUrl: "google.com",
        }),
      };
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Bienvenido 👋",
          text2: "¡Es genial tenerte con nosotros!",
        });

        setTimeout(() => {
          navigation.navigate(ROUTES.LOGIN);
        }, 2000);

        const responseData = await response.json();
        console.log("Respuesta del servidor:", console.log(responseData.data));
      } else {
        Toast.show({
          type: "error",
          text1:
            response.status === 400
              ? "El email se encuentra registrado"
              : "Datos incorrectos",
        });
        console.error("Error en la solicitud:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);

      Toast.show({
        type: "error",
        text1: "Ocurrio un error",
        text2: "Intente nuevamente",
      });
    }
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
   

      <KeyboardAwareScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <SVGComponentRegister height={130} />
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
      <Toast />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "#fff",
    flex: 1,
  },
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
