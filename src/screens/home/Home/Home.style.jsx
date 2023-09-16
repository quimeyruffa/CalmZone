import { StyleSheet } from "react-native";
import { COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    width:"100%",
    alignItems:"center",
    justifyContent: "flex-end",
  },
  button_fellings: {
    backgroundColor: COLOR.primary,
    borderRadius: 50,
    width: 341,
    height: 54,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
   backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    alignItems: "center",
    justifyContent: "flex-end",// Esto ajustará la imagen al tamaño de la pantalla
  },
  container_UserData: {
    color: "white",
    fontSize: 20,
  },
  heartbeat: {
    display: "flex",
    flexDirection: "row",
    width: 85,
  },
  button_heartbeat: {
    backgroundColor: COLOR.primary,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 50,
    width: 341,
    height: 73,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  line: {
    height: 73,
    width: 1,
    backgroundColor: "#A6A6A694",
  },
  text: {
    color: COLOR.primary,
    fontSize: 14,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  container_Text: {
    width: 341,
    display: "flex",
    alignItems:"center",
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor:COLOR.baseWhite,
    borderRadius:39

  },
  music_icon: {
    width: 85,
    display: "flex",
    flexDirection:"row",
    
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
