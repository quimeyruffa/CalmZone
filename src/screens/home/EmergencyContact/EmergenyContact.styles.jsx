import { StyleSheet } from "react-native";
import { COLOR } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent:"flex-end",
    backgroundColor: COLOR.primary,
  },
  container_profile: {
    height: "90%",
    width: "100%",
    backgroundColor: COLOR.baseWhite,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    display: "flex",
    alignItems: "center",
    paddingTop:30
  },
  container_UserData: {
    width: 340,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 150,
  },
  fontSize: {
    fontSize: 30,
    fontFamily: "Poppins",
    color: COLOR.dark,
    fontWeight: "bold",
  },
  fontSize_Name: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: COLOR.dark,
  },
  container_moreInformation: {
    width: 286,
    height: 60,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLOR.primary,
  },
  placeholder: {
    fontSize: 12,
    fontWeight: "bold",
  },
  data: {
    fontSize: 12,
  },
  button_DeleteAccount: {
    color: COLOR.darkRed,
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: COLOR.darkRed,
  },
  container_ButtonDeleteAccount: {
    width: 304,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});

export default styles;
