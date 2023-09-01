import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import React from "react";
import { COLOR, ROUTES } from "../../constants";
import { EmergencyContact, Home, Profile } from "../../screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          positon: "relative",
          bottom: 0,
          backgroundColor: "#fffff",
        },
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="home-outline"
                size={30}
                color={focused ? COLOR.selectScreem : COLOR.grayLight}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? COLOR.selectScreem : COLOR.grayLight}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.EMERGENGY_CONTAC}
        component={EmergencyContact}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="hearto"
                size={24}
                color={focused ? COLOR.selectScreem : COLOR.grayLight}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
