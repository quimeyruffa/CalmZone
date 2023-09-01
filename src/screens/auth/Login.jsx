import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";

import * as AppleAuthentication from "expo-apple-authentication";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { COLOR, ROUTES } from "../../constants";
import { CustomButton, Form } from "../../components";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const SignupSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().min(8).required("Please enter your password."),
});

const objInitialValues = {
  email: "",
  password: "",
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

  {
    name: "password",
    placeholder: "Password",
    login: true,
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

export default Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState();

  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);
  const [accessToken, setAccessToken] = useState(undefined);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "106493646538-phonqgihass12881ehie6jg92mib7be7.apps.googleusercontent.com",
    iosClientId:
      "106493646538-bocud7hg52esc5itklu4kbh47snekqhc.apps.googleusercontent.com",
    expoClientId:
      "106493646538-23fjfo3sofddt0acho6m5go0mv5147t2.apps.googleusercontent.com",
  });

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);

      if (isAvailable) {
        const credentialJson = await SecureStore.getItemAsync(
          "apple-credentials"
        );
        dispatch(tokenSlice.actions.save(credentialJson));
        setUserToken(JSON.parse(credentialJson));
      }
    };
    checkAvailable();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      SecureStore.setItemAsync(
        "apple-credentials",
        JSON.stringify(response.authentication)
      );
      getUserData(response.authentication.accessToken);
      dispatch(tokenSlice.actions.save(response.authentication));
    }
  }, [response]);

  const getUserData = async (accessToken) => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      dispatch(userSlice.actions.save(data));
      SecureStore.setItemAsync("user_data", JSON.stringify(data));
      setUserInfo(data);
    });
  };

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      setUserToken(credential);
      console.log(credential)
      // getCredentialState(credential.user)
      dispatch(userSlice.actions.save(jwtDecode(credential.identityToken)));
      SecureStore.setItemAsync(
        "user_data",
        JSON.stringify(jwtDecode(credential.identityToken))
      );
      dispatch(tokenSlice.actions.save(credential));
      SecureStore.setItemAsync("apple-credentials", JSON.stringify(credential));
    } catch (e) {
      console.log(e);
    }
  };

  const getCredentialState = async (user) => {
    const credentialState = await AppleAuthentication.getCredentialStateAsync(
      user
    );
    console.log("Credential state", credentialState);
  };

  const logout = async () => {
    SecureStore.deleteItemAsync("apple-credentials");
    setUserToken(undefined);
  };

  const refresh = async () => {
    const result = await AppleAuthentication.refreshAsync({
      user: userToken.user,
    });
    console.log(result);
    setUserToken(result);
    SecureStore.setItemAsync("apple-credentials", JSON.stringify(result));
  };

  const getAppleAuthContent = () => {
    if (!userToken) {
      return (
        <CustomButton
          text="Continuar con Apple"
          width={366}
          fontSize={16}
          borderColor={COLOR.dark}
          color={COLOR.baseWhite}
          backgroundColor={COLOR.dark}
          onPress={login}
        />
      );
    } else {
      const decoded = jwtDecode(userToken.identityToken);
      const current = Date.now() / 1000;
      return (
        <View>
          <Text>{decoded.email}</Text>
          <Text>Expired: {(current >= decoded.exp).toString()}</Text>
          <Button title="Logout" onPress={logout} />
          <Button title="Refresh" onPress={refresh} />
          <Button title="Get Credential State" onPress={getCredentialState} />
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <Text style={styles.title}>Iniciar Sesion</Text>
        <Form
          navigation={navigation}
          objInitialValues={objInitialValues}
          inputValues={inputValues}
          schema={SignupSchema}
          width={171}
          textButton="Iniciar Sesion"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Continuar con Google"
          width={366}
          borderColor={COLOR.grayLight}
          backgroundColor={COLOR.baseWhite}
          color={COLOR.dark}
          fontSize={16}
          onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
        />
        {appleAuthAvailable && getAppleAuthContent()}
        <TouchableOpacity
          style={styles.textRegister}
          onPress={() => navigation.navigate(ROUTES.REGISTER)}
        >
          <Text style={styles.textRegister}>
            No tenes una cuenta?{" "}
            <Text style={{ color: "#3644C0" }}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
  },
  buttonApple: {
    width: 366,
    height: 48,
  },
  inputIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  textRegister: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    position: "relative",
    marginBottom: 20,
  },
});
