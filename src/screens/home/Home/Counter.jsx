import React, { useState, useEffect } from "react";
import { Modal, Text, View, Button, StyleSheet } from "react-native";

const CountdownModal = ({
  isVisible,
  onClose,
  playSound,
  toggleModalContact,
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isVisible, countdown]);

  const handleHelpUser = () => {
    playSound();
    toggleModalContact();
    onClose();
  };
  return (
    <Modal
      style={{ position: "absolute" }}
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <Text style={style.modalText}>¿Estás bien?</Text>
          <Text style={style.text2}>Detectamos tu ritmo cardiaco acelerado</Text>
          <View style={style.container}>
            <View style={style.container2}>
              <Button
                title="Me encuentro bien"
                onPress={onClose}
                color="#6499E9"
              />
            </View>
            <Button
              title="Quiero ayuda"
              color="#C70039"
              onPress={handleHelpUser}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CountdownModal;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
  text2:{
    fontWeight:"bold",
    marginBottom:10
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
