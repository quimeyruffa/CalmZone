import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "./UserData.style";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../constants";
import { EditUserData } from "./function.UserData";
import { useSelector } from "react-redux";

export default UserData = ({ placeholder, data, key, keyVal }) => {
  const [name, setName] = useState(data);
  const [isEdit, setIsEdit] = useState(false);
  const userDataValue = useSelector((state) => state.userData);
  const { user_data } = userDataValue;

  const handleIsEdit = async () => {
    const obj = { [keyVal]: name };
    const res = await EditUserData(user_data.accessToken, obj);
    setIsEdit(!isEdit);
  };

  const handleChange = (e) => {
    setName(e);
  };

  return (
    <View
      key={key}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <View style={styles.container_moreInformation}>
        <Text style={styles.placeholder}>{placeholder}</Text>
        {!isEdit ? (
          <Text style={styles.data}>{name ? name : data}</Text>
        ) : (
          <TextInput
            autoCapitalize={false}
            onChangeText={(e) => handleChange(e)}
            value={name ? name : data}
          />
        )}
      </View>
      {isEdit ? (
        <AntDesign
          onPress={handleIsEdit}
          name="checkcircleo"
          size={45}
          color={COLOR.primary}
          style={{ marginLeft: 10 }}
        />
      ) : (
        <Feather
          onPress={handleIsEdit}
          name="edit"
          size={45}
          color={COLOR.dark}
          style={{ marginLeft: 10 }}
        />
      )}
    </View>
  );
};
