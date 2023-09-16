import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { CustomButton, Form } from "../../../components";
import { COLOR } from "../../../constants";
import styles from "./EmergenyContact.styles";

import * as Yup from "yup";

import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  LastName: Yup.string().required("Required"),
  relation: Yup.string().required("Required"),
  telephone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const objInitialValues = {
  // "user": "",
  email: "",
  telephone: "",
  relation: "",
  firstName: "",
  LastName: "",
  // "profilePictureUrl": ""
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
    name: "telephone",
    placeholder: "Telefono",
    icon: (
      <AntDesign
        name="phone"
        size={24}
        color="black"
        style={{
          marginLeft: 5,
          marginRight: 5,
        }}
      />
    ),
  },

  {
    name: "relation",
    placeholder: "Relacion",
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

const ModalCreateContact = ({ modalVisible, setModalVisible, navigation }) => {
  const sendData = (values) => {
    console.log(values);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{ width: 300, justifyContent: "flex-end", display: "flex" }}
          >
            <AntDesign
              name="closecircle"
              size={24}
              color={COLOR.primary}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <Text style={{ fontSize: 30, color: COLOR.dark, paddingBottom: 10 }}>
            Crear Contacto
          </Text>
          <Form
            event={sendData}
            navigation={navigation}
            objInitialValues={objInitialValues}
            inputValues={inputValues}
            schema={SignupSchema}
            width={149}
            textButton="Guardar"
          />
        </View>
      </View>
    </Modal>
  );
};

export default EmergencyContact = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const createContact = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <ModalCreateContact
        navigation={navigation}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <Text style={{ fontSize: 30, color: COLOR.baseWhite, paddingBottom: 10 }}>
        Contactos de emergencia
      </Text>
      <View style={styles.container_profile}>
        {userContacts.map((contact, index) => (
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 30 }}
          >
            <Ionicons
              name="person"
              size={68}
              color="black"
              style={{ marginRight: 20 }}
            />
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                {contact.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <AntDesign name="user" size={24} color="black" />
                <Text>{contact.contactType}</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <FontAwesome5 name="whatsapp" size={24} color="green" />
                <Text> {contact.wpp}</Text>
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
          onPress={createContact}
        />
      </View>
    </View>
  );
};
