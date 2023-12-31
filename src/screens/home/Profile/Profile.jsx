import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import styles from "./Profile.style";
import { Ionicons } from "@expo/vector-icons";
import { CustomButton, UserData } from "../../../components";
import { COLOR } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

export default Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [picture, setPicture] = useState(null);
  const userDataValue = useSelector((state) => state.userData);
  const token = useSelector((state) => state.token);


  const userData = [
    { id: 1, placeholder: "Nombre", data: user?.firstName  , key:"firstName" },
    { id: 2, placeholder: "Apellido", data: user?.lastName, key:"lastName" },
    { id: 3, placeholder: "Email", data: user?.email, key:"email" },
  ];


  React.useEffect(() => {
    setUser(userDataValue.user_data);
  }, [userDataValue]);
  return (
    <View  style={styles.container}>
      <Text style={{ fontSize: 30, color: COLOR.baseWhite, paddingBottom: 10 }}>
        Perfil
      </Text>
      <View style={styles.container_profile}>
        <View>
          <View style={styles.container_UserData}>
            <View style={{ paddingRight: 30 }}>
              {picture ? (
                <Image
                  source={{
                    uri: user?.picture,
                  }}
                />
              ) : (
                <Ionicons name="person" size={68} color="black" />
              )}
            </View>
            <View>
              <Text style={[styles.fontSize, { fontFamily: "Poppins-Medium" }]}>
                Hola!
              </Text>
              <Text style={styles.fontSize_Name}>{user?.firstName ? `${user?.firstName} ${user?.lastName}` : "Completa los campos vacios"}</Text>
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
          <UserData
            key={user.id}
            keyVal={user.key}
            placeholder={user.placeholder}
            data={user.data}
          />
        ))}
        <View style={{ marginTop: 20 }}>
          <CustomButton
            text="Cerrar Sesion"
            width={304}
            borderColor={COLOR.lightRed}
            backgroundColor={COLOR.lightRed}
            color={COLOR.darkRed}
            fontSize={16}
            onPress={() => dispatch(tokenSlice.actions.logout())}
          />

          <TouchableOpacity style={styles.container_ButtonDeleteAccount}>
            <Text style={styles.button_DeleteAccount}>Desactivar cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
