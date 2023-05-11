import React, { useState, useCallback, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BotChatBubble from "../../components/BotChatBubble";
import SenderChatBubble from "../../components/SenderChatBubble";

const Home = () => {
  const navigation = useNavigation();
  const ref = useRef(null);

  const [messages, setMessages] = useState([
    {
      isAi: false,
      value: "Hello Buddy, how can help you?",
    },
  ]);
  const [inputText, setInputText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modaldata, setModalData] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editedText, setEditedText] = useState(modaldata);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  }, []);

  const handleSubmit = async (Text) => {
    const formData = new FormData();
    formData.append("prompt", Text);

    // user's chatstripe
    setMessages((prevMessages) => [
      ...prevMessages,
      { isAi: false, value: Text },
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
        prompt: Text,
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

  // const handleImage = (image) => {
  //   const url = image.split("(");
  //   const img = url[1].slice(0, -1);
  //   console.log(img);
  //   return (
  //     <View>
  //       <Image
  //         style={{ height: 250, width: 280, borderRadius: 10 }}
  //         source={{
  //           uri: img,
  //         }}
  //       />
  //     </View>
  //   );
  // };

  // const IsModelOpen = (data) => {
  //   setModalData(data);
  // };

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
  const renderItem = ({ item }) => {
    return (
      <View
        key={item.id}
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
          {item.isAi ? (
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={require("../../../assets/512x512bb.jpg")}
            />
          ) : (
            <MaterialIcons name="emoji-emotions" size={43} color="#a9a9a9" />
          )}
        </View>
        {item.isAi ? (
          <BotChatBubble
            message={item.value}
            onPress={onPress}
            setEditedText={setEditedText}
          />
        ) : (
          <SenderChatBubble message={item.value} handleSubmit={handleSubmit} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
          }}
        >
          {messages.length !== 0 ? (
            <FlatList
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 25, fontWeight: "500", color: "#d3d3d3" }}
              >
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
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                fontSize: 18,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#138bf5",
                justifyContent: "center",
                borderRadius: 50,
                elevation: 5,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
              }}
              onPress={() => handleSubmit(inputText)}
            >
              <Image
                style={{ height: 50, width: 50, borderRadius: 50 }}
                source={require("../../../assets/2654384-middle.png")}
              />
            </TouchableOpacity>
          </View>

          <BottomSheet ref={ref}>
            <View style={{ flex: 1, backgroundColor: "#138bf5", elevation: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, padding: 15 }}>Header</Text>
                <View>
                  {isEdit ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsEdit(!isEdit), setModalData(editedText);
                      }}
                    >
                      <Feather name="check-square" size={30} color="#FFF" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setIsEdit(!isEdit), setEditedText(modaldata);
                      }}
                    >
                      <Feather name="edit" size={30} color="#FFF" />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity>
                  <Feather name="share-2" size={30} color="#FFF" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#FFF",
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  padding: 10,
                }}
              >
                {isEdit ? (
                  <>
                    <TextInput
                      style={{
                        width: "100%",
                        height: "40%",
                        // flex: 1,
                        padding: 10,
                        fontSize: 15,
                        fontWeight: "400",
                        // color: "#138bf5",
                        // backgroundColor: "#138bf5",
                        borderRadius: 20,
                      }}
                      multiline={true}
                      value={editedText}
                      onChangeText={(text) => setEditedText(text)}
                      scrollEnabled={true}
                    />
                  </>
                ) : (
                  <Text
                    style={{ fontSize: 15, fontWeight: "400", padding: 10 }}
                  >
                    {modaldata}
                  </Text>
                )}
              </View>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({});
