import React from "react";
import { useState } from "react";
import {
  FlatList,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { GetContacts } from "../EmergencyContact/function.EmergencyContact";
import { AntDesign } from "@expo/vector-icons";

function CallContact({ isVisible, onClose }) {
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;
  const [contacts, setContacts] = useState([]);

  const Item = ({ item }) => {
    const initiateWhatsAppSMS = () => {
      let url =
        "https://api.whatsapp.com/send?text=" +
        `Hola 👋 ${item.firstName} no estoy bien y me encuentro en esta ubicación 📍 https://maps.app.goo.gl/rX4fGzX8xtqJ6eEZ6` +
        "&phone=54" +
        item.telephone;
      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          alert("Make sure Whatsapp installed on your device");
        });
    };

    return (
      <TouchableOpacity onPress={initiateWhatsAppSMS}>
        <View style={style.row}>
          <Text>
            👋 {item.firstName} {item.lastName}
          </Text>

          <Text>📱 {item.telephone}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Contacts = async () => {
    if (user_data?.accessToken) {
      const res = await GetContacts(user_data.accessToken);
      setContacts(JSON.parse(res).body);
    }
  };
  React.useEffect(() => {
    Contacts();
  }, [user_data, isVisible]);

  return (
    <Modal
      style={{ position: "absolute", padding: 0 }}
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
        <TouchableOpacity onPress={onClose} style={{ position: "absolute", right: 10, top: 10 }}>

          <AntDesign
            name="closecircleo"
            size={24}
            color="black"
            
          />
        </TouchableOpacity>
          <Text style={style.modalText}>¿Queres hablar con un contacto?</Text>
          <Text>
            Selecciona un contacto para enviarle un mensaje de WhatsApp con tu
            ubicacion📍
          </Text>
          <View style={style.container}>
            <FlatList
              data={contacts}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={(item) => item.telephone}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CallContact;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.26)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerClose: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },

  container2: {
    marginRight: 10, // Establecer el margen deseado en píxeles
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9EDDFF",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  modalSubText: {
    marginBottom: 15,
    fontSize: 14,
    textAlign: "center",
  },
});
