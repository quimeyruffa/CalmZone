import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { FontAwesome } from "@expo/vector-icons";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("idle");
  const [audioPermission, setAudioPermission] = useState(null);

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

  async function startRecording() {
    try {
      // needed for IoS
      if (audioPermission) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
      }

      const newRecording = new Audio.Recording();
      console.log("Starting Recording");
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setRecordingStatus("recording");
    } catch (error) {
      console.error("Failed to start recording", error);
    }

    setTimeout(async () => {
       stopRecording();
    }, 5000);
  }

  async function stopRecording() {
    try {
        await recording?.stopAndUnloadAsync();
        const recordingUri = recording.getURI();
        setRecording(null);
        setRecordingStatus("stopped");

        uploadAudio(recordingUri);
      
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  }

  const uploadAudio = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("audio", {
        uri,
        type: "audio/wav",
        name: "audio.wav",
      });

      const response = await fetch(
        "https://xsnvjldmi4.execute-api.us-east-1.amazonaws.com/DEV/symptoms",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        console.log("Audio subido exitosamente");
      } else {
        console.error("Error al subir el audio");
      }
    } catch (error) {
      console.error("Error al subir el audio", error);
    }
  };

  async function handleRecordButtonPress() {
    if (recording) {
      const audioUri = await stopRecording(recording);
      if (audioUri) {
        console.log("Saved audio file to", savedUri);
      }
    } else {
      await startRecording();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRecordButtonPress}>
        <FontAwesome
          name={recording ? "stop-circle" : "circle"}
          size={64}
          color="white"
        />
      </TouchableOpacity>
      <Text
        style={styles.recordingStatusText}
      >{`Recording status: ${recordingStatus}`}</Text>
    </View>
  );
}
