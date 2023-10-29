import React from "react";
import { useEffect } from "react";
import { Modal, Text, View, Button, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const PremiumModal = ({
  isVisible,
  onClose,
  setSwitchPremium,
  switchPremium,
}) => {
  const handleSwitchPlan = () => {
    Toast.show({
      type: "success",
      text1: "Bienvenido 👋",
      text2: "Ya eres premium",
    });
    setSwitchPremium(true);
    onClose();
  };

  useEffect(() => {
    if (switchPremium) {
      setTimeout(function () {
        onClose();
      }, 2000);
    }
  }, []);
  return (
    <Modal
      style={{ position: "absolute" }}
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Toast />
      <View style={style.centeredView}>
        <View style={style.modalView}>
          {!switchPremium ? (
            <View>
              <Text style={style.modalText}>Cambia a Premium</Text>
              <Text style={style.text2}>
                Hacete premium por solo 3 USD mensuales:
              </Text>
              <Text style={style.text2}>
                - Análisis con algoritmos de inteligencia artificial
              </Text>
              <Text style={style.text2}>
                - Grabacion de audio para captar tu respinacion
              </Text>
            </View>
          ) : (
            <View>
              <Text style={style.modalText}>Ya sos Premium!</Text>
              <Text style={style.text2}>
                Acompañamos tu experiencia con detección de audio y un análisis
                posterior
              </Text>
            </View>
          )}
          <View style={style.container}>
            {!switchPremium ? (
              <Button
                title="Cambiar a Premium"
                color="#6499E9"
                onPress={handleSwitchPlan}
              />
            ) : (
              <Button title="Cerrar" color="#6499E9" onPress={onClose} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PremiumModal;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
  text2: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
