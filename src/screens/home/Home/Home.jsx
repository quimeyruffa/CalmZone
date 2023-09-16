import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React, { useRef, useState } from "react";
import styles from "./Home.style";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../../../constants";
import { Audio } from "expo-av";

export default Home = () => {
  const image = {
    uri: "https://res.cloudinary.com/dv8hvjcim/image/upload/v1694833139/eh83xctklntydmpwxnhk.png",
  };

  const [sound, setSound] = React.useState();

  async function playSound() {
    if (!sound) {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("./meditacion.mp3")
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } else {
      setSound(undefined);
    }
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View>
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
                color="white"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.container_UserData}>120</Text>
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
              <Ionicons name="watch-outline" size={40} color={COLOR.primary} />
              <Text style={styles.text}>Connected</Text>
            </View>
            <View style={styles.line}></View>

            <TouchableOpacity style={styles.music_icon} onPress={playSound}>
              <Ionicons
                name="md-musical-notes"
                size={40}
                color={COLOR.primary}
              />
              <Text style={styles.text}>Premium</Text>
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
