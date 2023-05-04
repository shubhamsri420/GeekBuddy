import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import TypeWriter from "../../Typewriter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Home = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modaldata, setModalData] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("prompt", inputText);

    // user's chatstripe
    setMessages((prevMessages) => [
      ...prevMessages,
      { isAi: false, value: inputText },
    ]);

    // to clear the text input
    setInputText("");

    // bot's chatstripe
    setMessages((prevMessages) => [
      ...prevMessages,
      { isAi: true, value: "searching....." },
    ]);

    const response = await fetch("https://geekbuddy.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputText,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { isAi: true, value: parsedData },
      ]);
    } else {
      const err = await response.text();
      alert(err);
    }
  };

  const handleImage = (image) => {
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

  const IsModelOpen = (data) => {
    setModalData(data);
  };

  // const handleLogOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate("Login");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        presentationStyle="pageSheet"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFF",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#138bf5",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <AntDesign
                style={{ padding: 10 }}
                name="back"
                size={30}
                color="#FFFF"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="star" size={30} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <AntDesign
                style={{ right: 10, padding: 10 }}
                name="sharealt"
                size={30}
                color="#FFFF"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              // backgroundColor: "red",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, padding: 10, color: "#138bf5" }}>
              {modaldata}
            </Text>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
        }}
      >
        {messages.length !== 0 ? (
          <ScrollView
            ref={(ref) => {
              scrollViewRef = ref;
            }}
            onContentSizeChange={() =>
              scrollViewRef.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  padding: 5,
                }}
              >
                <View
                  style={{
                    marginRight: 8,
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {message.isAi ? (
                    <Image
                      style={{ height: 40, width: 40, borderRadius: 20 }}
                      source={require("../../../assets/512x512bb.jpg")}
                    />
                  ) : (
                    <MaterialIcons
                      name="emoji-emotions"
                      size={43}
                      color="#424654"
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    padding: 8,
                    borderTopEndRadius: 15,
                    borderTopLeftRadius: 15,
                    borderBottomLeftRadius: 15,
                    backgroundColor: message.isAi ? "#138bf5" : "#dcdcdc",
                  }}
                  onLongPress={() => {
                    setModalVisible(!modalVisible), IsModelOpen(message.value);
                  }}
                >
                  {message.isAi ? (
                    message.value[0] === "!" ? (
                      handleImage(message.value)
                    ) : (
                      <TypeWriter text={message.value} speed={50} />
                    )
                  ) : (
                    <Text
                      style={{
                        color: "#138bf5",
                        fontSize: 20,
                        fontStyle: "italic",
                      }}
                    >
                      {message.value}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "500", color: "#d3d3d3" }}>
              Type your query...
            </Text>
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: 16,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            value={inputText}
            placeholder="Enter your query......"
            onChangeText={(text) => setInputText(text)}
            style={{
              flex: 1,
              borderRadius: 10,
              paddingVertical: 15,
              paddingHorizontal: 16,
              marginRight: 8,
              backgroundColor: "#ddd",
              elevation: 5,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#138bf5",
              justifyContent: "center",
              borderRadius: 50,
              elevation: 5,
            }}
            onPress={() => handleSubmit()}
          >
            <Image
              style={{ height: 50, width: 50, borderRadius: 50 }}
              source={require("../../../assets/2654384-middle.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({});
