import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Button,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, Form } from "../../../components";
import { COLOR } from "../../../constants";
import styles from "./EmergenyContact.styles";
import { useSelector } from "react-redux";
import {
  CreateContact,
  DeleteContact,
  EditContactData,
  GetContacts,
} from "./function.EmergencyContact";

import * as Yup from "yup";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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

const EditSchema = Yup.object({
  firstName: Yup.string(),
  LastName: Yup.string(),
  relation: Yup.string(),
  telephone: Yup.string().matches(
    /^[0-9]{6,}$/,
    "El número de teléfono debe tener al menos 6 dígitos numéricos"
  ),
  email: Yup.string().email("Direccion de Email invalida"),
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
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const { user_data } = userDataValue;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      handleUpload(newFile);
    }
  };

  const sendData = async (values) => {
    if (values) {
      values.profilePictureUrl = imageURL;

      const result = await CreateContact(
        user_data.accessToken,
        values,
        user_data.uid
      );
      if (JSON.parse(result).success) {
        let res = await GetContacts(user_data.accessToken);
        setContacts(JSON.parse(res).body);
        setModalVisible(!modalVisible);
        Toast.show({
          type: "success",
          text1: "Contacto creado con exito! 👏",
        });
      } else {
        setModalVisible(!modalVisible);
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

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dev_setups");
    data.append("cloud_name", "dv8hvjcim");

    await fetch("https://api.cloudinary.com/v1_1/dv8hvjcim/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) {
          setImageURL(data?.url);
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Ocurrio un error",
          });
        }
      });
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.modalView}>
            <View
              style={{
                width: 300,
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              <AntDesign
                name="closecircle"
                size={24}
                color={COLOR.primary}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View
              style={{
                width: 300,
                justifyContent: "flex-end",
                display: "flex",
              }}
            >
              <Text
                style={{ fontSize: 30, color: COLOR.dark, paddingBottom: 10 }}
              >
                Crear Contacto
              </Text>
              {image ? (
                <View onPress={pickImage}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 40,
                      marginRight: 20,
                    }}
                  />
                </View>
              ) : (
                <Ionicons
                  name="person"
                  size={60}
                  color="black"
                  style={{ marginRight: 20 }}
                  onPress={pickImage}
                />
              )}
            </View>

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
      </TouchableWithoutFeedback>
        </View>
    </Modal>
  );
};

const ModalEditContact = ({
  item,
  modalEditContact,
  setModalEditContact,
  navigation,
  setContacts,
}) => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;
  const inputEditValues = [
    {
      name: "firstName",
      value: item?.firstName,
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
      value: item?.lastName,
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
      value: item?.email,
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
      value: item?.telephone,
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
      value: item?.relation,
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      handleUpload(newFile);
    }
  };

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dev_setups");
    data.append("cloud_name", "dv8hvjcim");

    await fetch("https://api.cloudinary.com/v1_1/dv8hvjcim/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.url) {
          setImageURL(data?.url);
        } else {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Ocurrio un error",
          });
        }
      });
  };

  const sendData = async (values) => {
    if (values) {
      values.profilePictureUrl = imageURL;
      const objetosFiltrados = Object.keys(values).reduce((acc, key) => {
        if (values[key] !== "") {
          acc[key] = values[key];
        }
        return acc;
      }, {});
      const result = await EditContactData(
        user_data.accessToken,
        objetosFiltrados,
        item.id
      );
      if (result) {
        let res = await GetContacts(user_data.accessToken);
        setContacts(JSON.parse(res).body);
        setModalEditContact(!modalEditContact);
        Toast.show({
          type: "success",
          text1: "Contacto editado con exito! 👏",
        });
      } else {
        setModalEditContact(!modalEditContact);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Ocurrio un error",
        });
      }
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalEditContact}
      onRequestClose={() => {
        setModalEditContact(!modalEditContact);
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
              onPress={() => setModalEditContact(!modalEditContact)}
            />
          </View>
          <Text style={{ fontSize: 30, color: COLOR.dark, paddingBottom: 10 }}>
            Datos del Contacto
          </Text>
          {image ? (
            <View onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 40,
                  marginRight: 20,
                }}
              />
            </View>
          ) : (
            <Ionicons
              name="person"
              size={60}
              color="black"
              style={{ marginRight: 20 }}
              onPress={pickImage}
            />
          )}
          <Form
            event={sendData}
            navigation={navigation}
            objInitialValues={objInitialValues}
            inputValues={inputEditValues}
            schema={EditSchema}
            width={169}
            textButton="Guardar Cambios"
          />
          <Toast />
        </View>
      </View>
    </Modal>
  );
};

export default EmergencyContact = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditContact, setModalEditContact] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemSelect, setItemSelect] = useState();
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;

  const renderItem = ({ item }) => {
    return (
      <View
        key={item.email}
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: 15,
          marginBottom: 30,
          alignItems: "center",
          backgroundColor: COLOR.baseWhite,
          height: 130,
        }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          {item.profilePictureUrl ? (
            <Image
              source={{ uri: item?.profilePictureUrl }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 40,
                marginRight: 20,
              }}
            />
          ) : (
            <Ionicons
              name="person"
              size={60}
              color="black"
              style={{ marginRight: 20 }}
            />
          )}
        </View>
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

        <Feather
          name="edit"
          size={30}
          color={COLOR.primary}
          style={{ marginLeft: 20 }}
          onPress={() => {
            setItemSelect(item);
            setModalEditContact(!modalEditContact);
          }}
        />
      </View>
    );
  };

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

      <ModalEditContact
        item={itemSelect}
        modalEditContact={modalEditContact}
        setModalEditContact={setModalEditContact}
        navigation={navigation}
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
          ) : contacts?.length > 0 ? (
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
