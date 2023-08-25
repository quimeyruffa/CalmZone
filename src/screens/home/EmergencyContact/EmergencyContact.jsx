import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CustomButton } from "../../../components";
import { COLOR } from "../../../constants";
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
    <View>
      {userContacts.map((contact, index) => (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Ionicons name="person" size={68} color="black" />
          <View>
            <Text>{contact.name}</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
            <AntDesign name="user" size={24} color="black" />
              <Text>{contact.contactType}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
            <FontAwesome5 name="whatsapp" size={24} color="black" />
              <Text>{contact.wpp}</Text>
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
  );
};
