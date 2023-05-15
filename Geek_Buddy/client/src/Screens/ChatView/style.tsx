import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  emptyListView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Text_1: {
    fontSize: 25,
    fontWeight: "500",
    color: "#d3d3d3",
  },
  Input_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  Text_Input: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginRight: 8,
    backgroundColor: "#ddd",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    fontSize: 18,
  },
  send_button_View: {
    backgroundColor: "#138bf5",
    justifyContent: "center",
    borderRadius: 50,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  send_button_image: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  bottomsheet_content_view: {
    flex: 1,
    backgroundColor: "#138bf5",
    elevation: 8,
  },
  bottomsheet_header_View: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomsheet_header_text: {
    fontSize: 20,
    padding: 15,
  },
  bottomsheet_main_content: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 10,
  },
  chatStripe_View: {
    flexDirection: "row",
    marginTop: 5,
    padding: 5,
  },
  chatStripe_Image_View: {
    marginRight: 8,
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
