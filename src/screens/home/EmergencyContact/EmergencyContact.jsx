import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CustomButton } from "../../../components";
import { COLOR } from "../../../constants";
import styles from "./EmergenyContact.styles";
const userContacts = [
  {
    name: "Marcela Baltron",
    contactType: "Amiga",
    wpp: "+549112888842",
  },
  {
    name: "Marcela Baltron",
    contactType: "Amigo",
    wpp: "+549112888842",
  },
];
export default EmergencyContact = () => {
  return (
    <View style={styles.container}>
       <Text style={{ fontSize: 30, color: COLOR.baseWhite, paddingBottom: 10 }}>
       Contactos de emergencia
      </Text>
      <View style={styles.container_profile}>

      {userContacts.map((contact, index) => (
        <View style={{ display: "flex", flexDirection: "row", marginBottom:30 }}>
          <Ionicons name="person" size={68} color="black" style={{marginRight:20}}/>
          <View>
            <Text style={{fontWeight:"bold", marginBottom:10}}>{contact.name}</Text>
            <View style={{ display: "flex", flexDirection: "row", marginBottom:10 }}>
            <AntDesign name="user" size={24} color="black" />
              <Text>{contact.contactType}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
            <FontAwesome5 name="whatsapp" size={24} color="green" />
              <Text>  {contact.wpp}</Text>
            </View>
          </View>
        </View>
      ))}
      <CustomButton
              text={"Añadir Contacto"}
              width={189}
              fontSize={16}
              borderColor={COLOR.primary}
              backgroundColor={COLOR.primary}
              color={COLOR.baseWhite}
            //   onPress={handleSubmit}
            />
      </View>
    </View>
  );
};
