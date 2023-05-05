import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const SenderChatBubble = ({ message, handleSubmit }: any) => {
  const [onClick, setOnClick] = React.useState(false);
  const [newMessage, setNewMessage] = useState(message);
  const bubbleStyle = styles.selfBubble;
  const textStyle = styles.selfText;

  return (
    <View style={[styles.bubbleContainer, bubbleStyle]}>
      {onClick ? (
        <View style={styles.Edit_TextInput_Box}>
          <TextInput
            value={newMessage}
            style={styles.Input}
            placeholder="edit here..."
            onChangeText={(Text) => {
              setNewMessage(Text);
            }}
            multiline={true}
          />

          <View style={styles.Icon_Container}>
            <TouchableOpacity
              onPress={() => {
                handleSubmit(newMessage), setOnClick(false);
              }}
            >
              <Feather name="check-circle" size={20} color="#FFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setOnClick(!onClick), setNewMessage(message);
              }}
            >
              <MaterialIcons name="edit-off" size={20} color="#ffff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.Text_Icon_Box}>
          <View style={{ width: "90%" }}>
            <Text style={textStyle}>{message}</Text>
          </View>

          <TouchableOpacity onPress={() => setOnClick(!onClick)}>
            <Feather name="edit" size={20} color="#ffff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginVertical: 5,
    maxWidth: "100%",
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: "80%",
  },
  selfBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff",
  },
  selfText: {
    color: "#fff",
    fontSize: 20,
    fontStyle: "italic",
  },
  Edit_TextInput_Box: {
    flexDirection: "row",
    gap: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Input: {
    fontSize: 20,
    fontStyle: "italic",
    width: "90%",
  },
  Icon_Container: {
    justifyContent: "space-between",
    gap: 10,
    flexDirection: "row",
  },
  Text_Icon_Box: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
  },
});

export default SenderChatBubble;
