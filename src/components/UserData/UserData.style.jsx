import { StyleSheet } from "react-native";
import { COLOR } from "../../constants";

const styles = StyleSheet.create({
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
    marginBottom:15
  },
  placeholder: {
    fontSize: 12,
    fontWeight: "bold",
  },
  data: {
    fontSize: 12,
  },
});

export default styles;
