import { Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';


export default CustomButton = ({ text, width, borderColor, backgroundColor, color, onPress,fontSize, displayButton }) => {
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
                position:"relative",
                width: width,
                borderRadius: 48,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                borderStyle: "solid",
                borderWidth: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom:40,
                display: displayButton ?  displayButton : "flex" 
            }}
        >
            <Text style={{
                fontSize: fontSize,
                fontFamily: "Poppins-Medium",
                color: color,
            }}>

                {text}
            </Text>
        </TouchableOpacity>
    )
}