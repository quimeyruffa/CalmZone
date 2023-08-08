import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';


export default CustomButton = ({ text, width, borderColor, backgroundColor, color, onPress }) => {
    const [loaded] = useFonts({
        "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 48,
                width: width,
                borderRadius: 48,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                borderStyle: "solid",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex"
            }}
        >
            <Text style={{
                fontSize: 20,
                fontFamily: "Poppins-Medium",
                color: color,
            }}>

                {text}
            </Text>
        </TouchableOpacity>
    )
}