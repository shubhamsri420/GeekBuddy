import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import TypeWriter from "../Typewriter";

const BotChatBubble = ({ message, onPress }: any) => {
  const bubbleStyle = styles.otherBubble;
  const textStyle = styles.otherText;

  const handleImage = (image: any) => {
    const url = image.split("(");
    const img = url[1].slice(0, -1);
    console.log(img);
    return (
      <View>
        <Image
          style={{ height: 250, width: 280, borderRadius: 10 }}
          source={{
            uri: img,
          }}
        />
      </View>
    );
  };

  return (
    <View>
      {message[0] === "!" ? (
        handleImage(message)
      ) : (
        <View style={[styles.bubbleContainer, bubbleStyle]}>
          <TypeWriter text={message} speed={50} textColor={"black"} />
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
    width: "85%",
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selfBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#0084ff",
  },
  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#e5e5ea",
  },
  selfText: {
    color: "#fff",
  },
  otherText: {
    color: "#000",
  },
});

export default BotChatBubble;
