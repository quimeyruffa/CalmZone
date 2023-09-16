import { StyleSheet } from "react-native";
import { COLOR } from "../../constants";

export default styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 327,
    height: 48,
    borderRadius:8,
    borderColor:COLOR.primary,
    borderStyle:"solid",
    borderWidth:2,
  },
  inputIcon:{
    marginLeft:5,
    marginRight:5
  },
  inputLabel:{
    fontSize:12,
    color:'#72777A',
    position:"absolute",
    top:10,
  },
  input:{
    width: 280,
    height: 48,
    marginTop:10,
    fontSize:16
  },
  inputError:{
    maxWidth:280,
    minHeight:20,
    bottom:0,
    margin:0,
    color:COLOR.darkRed
  },
  inputHandlerError:{
    maxWidth:280,
    height:20,
    color:COLOR.baseWhite
  },
  containerButton:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    marginTop:20
  }
});
