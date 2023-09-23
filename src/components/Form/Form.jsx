import { View, Text, TextInput, Alert, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Formik } from "formik";
import React from "react";
import FormStyles from "./Form.styles";
import CustomButton from "../CustomButton";
import { COLOR, ROUTES } from "../../constants";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from '@expo/vector-icons';
// const SignupSchema = Yup.object({
// firstName: Yup.string()
//   .max(15, "Must be 15 characters or less")
//   .required("Required"),
// lastName: Yup.string()
//   .max(20, "Must be 20 characters or less")
//   .required("Required"),
// email: Yup.string().email("Invalid email address").required("Required"),
// password: Yup.string()
//   .min(8)
// .required("Please enter your password.")
// .matches(
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//   "Must contain minimun 8 characters,one number, at least one uppercase/undercasse letter, one special character"
// ),
// confirmPassword: Yup.string()
//   .min(8, "Confirm password must be 8 characters long.")
//   .oneOf([Yup.ref("password")], "Your password do not match")
//   .required("Confirm password is required."),
// });

export default Form = ({
  width,
  schema,
  displayButton,
  objInitialValues,
  inputValues,
  textButton,
  navigation,
  event,
}) => {
  const relations = ["Profesional", "Amigo", "Amiga", "Familiar", "Otro"];

  return (
    <Formik
      initialValues={objInitialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        event(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View>

          {inputValues.map((item, index) => (
            <View key={index + item.name}>
              {item?.name === "relation" && (
                <Text style={{color:"#72777A"}}>{item.placeholder}</Text>
                )}
              <View style={FormStyles.inputContainer}>
                {item?.icon}
                {item?.name !== "relation" ? (
                  <>
                    <View>
                      <Text style={FormStyles.inputLabel}>
                        {item.placeholder}
                      </Text>
                      <TextInput
                        style={FormStyles.input}
                        autoCapitalize={false}
                        onChangeText={handleChange(item.name)}
                        value={values[item.name] || item.value}
                        onBlur={() => setFieldTouched(values[item.name])}
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <SelectDropdown
                    defaultButtonText={item.value ? item.value : "Selecciona una opción"}
                      buttonStyle={{
                        backgroundColor: COLOR.baseWhite,
                        height: "100%",
                        width: 280,
                      }}
                      buttonTextStyle={{
                        color:"#72777A"
                      }}
                      renderDropdownIcon={() =><AntDesign name="down" size={24} color={COLOR.primary} />}
                      data={relations}
                      onSelect={(selectedItem, index) => {
                        setFieldValue(item.name, selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        return item;
                      }}
                    />
                  </>
                )}
              </View>

              {touched[item.name] && errors[item.name] ? (
                <Text style={FormStyles.inputError}>{errors[item.name]}</Text>
              ) : (
                <Text style={FormStyles.inputHandlerError}></Text>
              )}
              {item?.login && (
                <TouchableOpacity
                  onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                >
                  <Text
                    style={{
                      position: "absolute",
                      bottom: -5,
                      right: 0,
                      color: "#3644C0",
                      fontWeight: "bold",
                    }}
                  >
                    Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <View style={FormStyles.containerButton}>
            <CustomButton
              text={textButton}
              width={width}
              displayButton={displayButton}
              fontSize={16}
              borderColor={COLOR.primary}
              backgroundColor={COLOR.primary}
              color={COLOR.baseWhite}
              onPress={handleSubmit}
            />
          </View>
        </View>
      )}
    </Formik>

  );
};
//secureTextEntry={true}
//                  keyboardType='numeric'
