import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import * as Yup from "yup";
import Svg, { Circle, Rect } from "react-native-svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Form } from "../../components";
import { COLOR, ROUTES } from "../../constants";

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

export default ForgotPassword = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView  contentContainerStyle={styles.container}>
   
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

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Svg width="100" height="100">
          <Circle cx="50" cy="50" r="40" fill="blue" />
        </Svg>

        <Svg width="100" height="100">
          <Rect width="80" height="60" fill="green" />
        </Svg>
      </View>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <Text style={styles.subTitle}>
        Te enviaremos un mail para restablercer la contraseña
      </Text>
      <Form
        objInitialValues={objInitialValues}
        inputValues={inputValues}
        schema={SignupSchema}
        textButton="Guardar"
        width={327}
      />
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height:"100%"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    position: "relative",
    marginBottom: 20,
  },
  subTitle: {
    width: 260,
    fontSize: 18,
    marginBottom: 20,
    color: "#827D7D",
  },
  arrowButton: {
    position: "absolute",
    top: 20,
    left: 40,
  },
});
