import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Home.style";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "../../../constants";
export default Home = () => {
  return (
    <View style={styles.container}>
      <View>
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
          }}
        >
          <MaterialCommunityIcons name="meditation" size={70} color="black" />
          <MaterialCommunityIcons name="meditation" size={70} color="black" />
        </View>
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
          <TouchableOpacity style={{ width: 85 }}>
            <Text style={styles.text}>Contactos de</Text>

            <Text style={styles.text}>Emergencia</Text>
          </TouchableOpacity>
          <View style={styles.line}></View>

          <TouchableOpacity style={{ width: 85 }}>
            <Text style={styles.text}>Técnica de</Text>
            <Text style={styles.text}>Relajacion</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container_Text}>
          <View style={{ width: 85 }}></View>
          <View style={styles.line}></View>

          <TouchableOpacity
            style={styles.music_icon}
          >
            <Ionicons name="md-musical-notes" size={40} color={COLOR.primary} />
          </TouchableOpacity>
        </View>

        <View style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
        <MaterialCommunityIcons name="meditation" size={40} color="#979C9E" />

        </View>
      </View>
    </View>
  );
};
