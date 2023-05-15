import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#138bf5",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  main_Content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f7f6",
    borderRadius: 20,
  },
  LogoAndText_Box: {
    alignItems: "center",
  },
  Text_1: {
    color: "#138bf5",
    fontSize: 30,
    padding: 10,
    fontFamily: "Dan-bold",
  },
  Logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  Text_Container: {
    width: "100%",
    padding: 5,
    alignItems: "center",
  },
  Text_2: {
    color: "#138bf5",
    fontSize: 30,
    fontFamily: "Dan-bold",
    padding: 5,
  },
  Image_Container: {
    width: "80%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  button_container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 15,
    padding: 15,
    flexDirection: "row",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d83ee",
    borderRadius: 100,
    elevation: 8,
  },
  button_Icon: {
    padding: 10,
  },
  //BottomSheet styling
  BSheet_main_Content: {
    flex: 1,
    backgroundColor: "#1d83ee",
    gap: 10,
    padding: 10,
  },
  BSheet_header: {
    flexDirection: "row",
    gap: 20,
  },
  BSheet_ImageContainer: {
    backgroundColor: "#FFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  BSheet_TextContainer: {
    justifyContent: "center",
  },
  Name: {
    fontSize: 30,
    color: "#FFFF",
    fontWeight: "700",
  },
  Email: {
    fontSize: 15,
    color: "#FFFF",
    fontWeight: "400",
  },
  Button_Container: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFF",
    paddingTop: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
