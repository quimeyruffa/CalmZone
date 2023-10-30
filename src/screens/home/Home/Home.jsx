import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import React, { useRef, useState } from "react";
import styles from "./Home.style";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLOR, ROUTES } from "../../../constants";
import { Audio } from "expo-av";
import { useSelector } from "react-redux";
import CountdownModal from "./Counter";
import CallContact from "./CallContact";
import { useEffect } from "react";
import PremiumModal from "./PremiumModal";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';
import axios from "axios";

const recordingOptions = {
  android: {
    extension: ".wav",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".wav",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default Home = ({ navigation }) => {
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalContact, setIsModalContact] = useState(false);
  const [switchPremium, setSwitchPremium] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [beat, setBeat] = useState(90);
  let recording = new Audio.Recording();

  useEffect(() => {
    // Simply get recording permission upon first render
    async function getPermission() {
      await Audio.requestPermissionsAsync()
        .then((permission) => {
          console.log("Permission Granted: " + permission.granted);
          setAudioPermission(permission.granted);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Call function to get permission
    getPermission();
    // Cleanup upon first render
    return () => {
      if (recording) {
        stopRecording();
      }
    };
  }, []);

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  async function startRecording() {
    try {
      if (audioPermission && switchPremium) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true, // Habilita la grabación en iOS
          playsInSilentModeIOS: true, // Permite la reproducción de audio en modo silencioso en iOS (opcional)
          staysActiveInBackground: false, // Permite que la aplicación siga ejecutándose en segundo plano (ajusta según sea necesario)
        });
        await Audio.requestPermissionsAsync();
        await recording.prepareToRecordAsync(recordingOptions);
        await recording.startAsync();
        console.log("Starting Recording");

        setRecordingStatus("recording");
        setTimeout(function () {
          stopRecording();
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    console.log("Stop recording");

    try {
      await recording.stopAndUnloadAsync();
      const recordingUri = recording.getURI();
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", recordingUri, true);
        xhr.send(null);
      });

      const audioBase64 = await blobToBase64(blob);
      blob.close();

      setRecordingStatus("stopped");

      await uploadAudio(recordingUri);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  const uploadAudio = async (uri) => {
    const base64Audio = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(base64Audio)
    const response = await axios.post(
      "https://xsnvjldmi4.execute-api.us-east-1.amazonaws.com/DEV/breathwav",
      base64Audio,
      {
        headers: {
          "Content-Type": "audio/wav",
        },
      }
    );
    // const response = await fetch(
    //   "https://xsnvjldmi4.execute-api.us-east-1.amazonaws.com/DEV/breathwav",
    //   {
    //     method: "POST",
    //     body: formData,
    //     headers: {
    //       "Content-Type": "audio/wav",
    //     },
    //   }
    // );

    console.log(response);
    if (response.ok) {
      console.log(response.json());
      console.log("Audio subido exitosamente");
    } else {
      console.error("Error al subir el audio");
    }
  };

  const toggleModal = () => {
    if (isModalVisible) {
      setBeat(100);
    }
    if (!isModalVisible && switchPremium) {
      startRecording();
    }

    setModalVisible(!isModalVisible);
  };

  const toggleModalContact = () => {
    setIsModalContact(!isModalContact);
  };

  const getSymptoms = async () => {
    setBeat(115);
    var myHeaders = new Headers();
    myHeaders.append("authorization", user_data.accessToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: user_data.uid,
      weight: "39",
      age: "34",
      bpm: "200",
      sex: "0",
      smoking: "0",
      alcohol: "0",
      exercise: "3",
      stress_level: "1",
      bmi: "0",
      sedentary_hours: "4",
      sleephours: "8",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://xsnvjldmi4.execute-api.us-east-1.amazonaws.com/DEV/symptoms",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        if (res.panic === true) {
          toggleModal();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const image = {
    uri: "https://res.cloudinary.com/dv8hvjcim/image/upload/v1694833139/eh83xctklntydmpwxnhk.png",
  };

  const [sound, setSound] = React.useState();

  async function playSound() {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(
        require("./meditacion.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } else {
      setSound(undefined);
    }
  }

  const togglePlanModal = () => {
    setOpenPlanModal(false);
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
          <CallContact
            isVisible={isModalContact}
            onClose={toggleModalContact}
          />
          <CountdownModal
            isVisible={isModalVisible}
            onClose={toggleModal}
            toggleModalContact={toggleModalContact}
            playSound={playSound}
          />
          <PremiumModal
            isVisible={openPlanModal}
            onClose={togglePlanModal}
            setSwitchPremium={setSwitchPremium}
            switchPremium={switchPremium}
          />
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 100,
            }}
          >
            <TouchableOpacity
              onPress={playSound}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLOR.baseWhite,
              }}
            >
              <Text
                style={{
                  color: COLOR.primary,
                  fontSize: 40,
                  fontWeight: "bold",
                }}
              >
                SOS
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button_fellings}>
            <Entypo
              name="emoji-happy"
              size={24}
              color="#FFD233"
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.container_UserData}>¿Cómo te sientes?</Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          ></View>
          <TouchableOpacity style={styles.button_heartbeat}>
            <View style={styles.heartbeat}>
              <FontAwesome
                name="heartbeat"
                size={34}
                color={switchPremium ? "#FFD233" : "white"}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.container_UserData}>{beat}</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.heartbeat}>
              <FontAwesome5
                name="lungs"
                size={34}
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.container_UserData}>120</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.container_Text}>
            <TouchableOpacity
              style={{
                width: 85,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate(ROUTES.EMERGENGY_CONTAC)}
            >
              <MaterialCommunityIcons
                name="contacts"
                size={40}
                color={COLOR.primary}
              />
              <View>
                <Text style={styles.text}>Contactos de</Text>
                <Text style={styles.text}>Emergencia</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity
              style={{
                width: 85,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="meditation"
                size={40}
                color={COLOR.primary}
              />
              <View>
                <Text style={styles.text}>Técnica de</Text>
                <Text style={styles.text}>Relajacion</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container_Text}>
            <View
              style={{ width: 85, flexDirection: "row", alignItems: "center" }}
            >
              <TouchableOpacity onPress={getSymptoms} style={styles.music_icon}>
                <Ionicons
                  name="watch-outline"
                  size={40}
                  color={COLOR.primary}
                />
                <Text style={styles.text}>Connected</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.line}></View>

            <TouchableOpacity
              style={styles.music_icon}
              onPress={() => setOpenPlanModal(true)}
            >
              <MaterialIcons
                name="card-membership"
                size={40}
                color={COLOR.primary}
              />
              <Text style={styles.text}>
                {switchPremium ? "Plan Premium" : "Cambia a premium"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="meditation"
              size={40}
              color={"transparent"}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
