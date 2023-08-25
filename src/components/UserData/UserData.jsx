import { View, Text } from "react-native";
import React from "react";
import styles from "./UserData.style";

import { Feather } from '@expo/vector-icons';

export default UserData = ({ placeholder, data, key }) => {
  return (
    <View key={key} style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
      <View style={styles.container_moreInformation}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        <Text style={styles.data}>{data}</Text>
      </View>
      <Feather name="edit" size={45} color="black" style={{marginLeft:10}} />
    </View>
  );
};
