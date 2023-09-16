import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, Form } from "../../../components";
import { COLOR } from "../../../constants";
import styles from "./EmergenyContact.styles";
import { useSelector } from "react-redux";
import {
  CreateContact,
  DeleteContact,
  GetContacts,
} from "./function.EmergencyContact";

import * as Yup from "yup";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import { SwipeListView } from "react-native-swipe-list-view";

const SignupSchema = Yup.object({
  firstName: Yup.string().required("Campo Obligatorio"),
  LastName: Yup.string().required("Campo Obligatorio"),
  relation: Yup.string().required("Campo Obligatorio"),
  telephone: Yup.string()
    .required("Campo Obligatorio")
    .matches(
      /^[0-9]{6,}$/,
      "El número de teléfono debe tener al menos 6 dígitos numéricos"
    ),
  email: Yup.string()
    .email("Direccion de Email invalida")
    .required("Campo Obligatorio"),
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
    placeholder: "Relación",
    icon: (
      <Entypo
        name="heart-outlined"
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

const ModalCreateContact = ({
  modalVisible,
  setModalVisible,
  navigation,
  setContacts,
}) => {
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;
  const sendData = async (values) => {
    if (values) {
      const result = await CreateContact(
        user_data.accessToken,
        values,
        user_data.uid
      );
      if (JSON.parse(result).success) {
        Toast.show({
          type: "success",
          text1: "Contacto creado con exito! 👏",
        });
        let res = await GetContacts(user_data.accessToken);
        setContacts(JSON.parse(res).body);
        setModalVisible(!modalVisible);
      } else {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ocurrio un error",
          text2: JSON.parse(result).message
            ? JSON.parse(result).message
            : JSON.parse(result).error,
        });
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
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
          <Toast />
        </View>
      </View>
    </Modal>
  );
};
const renderItem = ({ item }) => (
  <View
    key={item.email}
    style={{
      display: "flex",
      flexDirection: "row",
      marginBottom: 30,
      backgroundColor: COLOR.baseWhite,
      height: 130,
    }}
  >
    <Ionicons
      name="person"
      size={68}
      color="black"
      style={{ marginRight: 20 }}
    />
    <View>
      <Text
        style={{
          fontWeight: "bold",
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        {item.firstName} {item.lastName}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <AntDesign name="user" size={24} color="black" />
        <Text>{item.relation}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <AntDesign
          name="mail"
          size={24}
          color="#090A0A"
          style={{ marginRight: 5 }}
        />
        <Text>{item.email}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesome5 name="whatsapp" size={24} color="green" />
        <Text> {item.telephone}</Text>
      </View>
    </View>
    
  </View>
);

export default EmergencyContact = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;

  const createContact = () => {
    setModalVisible(!modalVisible);
  };

  const handleDeleteItem = async (itemId) => {
    let res = await DeleteContact(user_data.accessToken, itemId);
    if (JSON.parse(res).success) {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Contacto eliminado.",
      });
      let res = await GetContacts(user_data.accessToken);
      setContacts(JSON.parse(res).body);
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Ocurrio un error",
        text2: "Intente nuevamente",
      });
    }
  };

  const renderHiddenItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleDeleteItem(item.id)}
      style={{
        alignItems: "flex-end",
        paddingRight: 20,
        backgroundColor: "#D80032",
        height: 130,
        justifyContent: "center",
      }}
    >
      <MaterialIcons name="delete-outline" size={40} color={COLOR.baseWhite} />
    </TouchableOpacity>
  );

  useEffect(() => {
    const handleContacts = async () => {
      setLoading(true);
      const res = await GetContacts(user_data.accessToken);
      setContacts(JSON.parse(res).body);
      setLoading(false);
    };
    handleContacts();
  }, []);

  return (
    <View style={styles.container}>

      <ModalCreateContact
        navigation={navigation}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        setContacts={setContacts}
      />
              
      <Text style={{ fontSize: 30, color: COLOR.baseWhite, paddingBottom: 10 }}>
        Contactos de emergencia
      </Text>
      <View style={styles.container_profile}>
        <View style={{ height: "85%" }}>
          {loading ? (
            <Spinner
              visible={loading}
              textContent={"Cargando..."} // Texto opcional que se muestra junto a la animación
              textStyle={{ color: "#FFF" }} // Estilos para el texto
            />
          ) : contacts ? (
            <SwipeListView
              data={contacts}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75} // Width of the left side (empty in this example)
              rightOpenValue={-75} // Width of the right side (delete button)
              disableRightSwipe={true} // Disable swiping from right to left
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text>No tienes contactos</Text>
            )}
        </View>
      </View>
      <View style={{ bottom: 0, position: "absolute" }}>
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
      <Toast />
    </View>
  );
};
