import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Profile.style";
import { Ionicons } from "@expo/vector-icons";
import { CustomButton, UserData } from "../../../components";
import { COLOR } from "../../../constants";
import { useDispatch } from "react-redux";
const userData = [
  { id: 1, placeholder: "Nombre", data: "Esteban Gonzalez" },
  { id: 2, placeholder: "Telefono", data: "11 6554 - 5034" },
  { id: 3, placeholder: "Email", data: "estebangonzalez@gmail.com" },
];
export default Profile = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: COLOR.baseWhite, paddingBottom: 10 }}>
        Perfil
      </Text>
      <View style={styles.container_profile}>
        <View>
          <View style={styles.container_UserData}>
            <View style={{ paddingRight: 30 }}>
              <Ionicons name="person" size={68} color="black" />
            </View>
            <View>
              <Text style={[styles.fontSize, { fontFamily: "Poppins-Medium" }]}>
                Hola!
              </Text>
              <Text style={styles.fontSize_Name}>Esteban Gonzalez</Text>
            </View>
          </View>
          <CustomButton
            text="Cambiar foto"
            width={150}
            borderColor={COLOR.primary}
            backgroundColor={COLOR.primary}
            color={COLOR.baseWhite}
            fontSize={16}
            // onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
          />
        </View>
        {userData.map((user) => (
          <UserData key={user.id} placeholder={user.placeholder} data={user.data} />
        ))}
        <View style={{ marginTop: 20 }}>
          <CustomButton
            text="Cerrar Sesion"
            width={304}
            borderColor={COLOR.lightRed}
            backgroundColor={COLOR.lightRed}
            color={COLOR.darkRed}
            fontSize={16}
             onPress={() =>  dispatch(tokenSlice.actions.logout())}
          />

          <TouchableOpacity style={styles.container_ButtonDeleteAccount}>
            <Text style={styles.button_DeleteAccount}>Desactivar cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
