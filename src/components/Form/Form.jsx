import { View, Text, TextInput, Alert } from "react-native";
import { Formik } from "formik";
import React from "react";
import FormStyles from "./Form.styles";
import CustomButton from "../CustomButton";
import { COLOR } from "../../constants";

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
  objInitialValues,
  inputValues,
  textButton,
}) => {
  return (
    <Formik
      initialValues={objInitialValues}
      validationSchema={schema}
      onSubmit={(values) => Alert.alert(JSON.stringify(values))}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View>
          {inputValues.map((item, index) => (
            <View key={index + item.name}>
              <View style={FormStyles.inputContainer}>
                {item?.icon}
                <View>
                  <Text style={FormStyles.inputLabel}>{item.placeholder}</Text>
                  <TextInput
                    style={FormStyles.input}
                    autoCapitalize={false}
                    onChangeText={handleChange(item.name)}
                    value={values[item.name]}
                    onBlur={() => setFieldTouched(values[item.name])}
                  />
                </View>
              </View>
              {touched[item.name] && errors[item.name] && (
                <Text style={FormStyles.inputError}>{errors[item.name]}</Text>
              )}
            </View>
          ))}
          <View style={FormStyles.containerButton}>
            <CustomButton
              text={textButton}
              width={width}
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
