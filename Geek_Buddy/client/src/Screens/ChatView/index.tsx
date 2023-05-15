import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BotChatBubble from "../../components/BotChatBubble";
import SenderChatBubble from "../../components/SenderChatBubble";
import { styles } from "./style";

interface Messages {
  id: string;
  isAi: boolean;
  value: string;
}

const ChatViewScreen: React.FC = () => {
  const navigation = useNavigation();
  const ref = useRef<any>(null);
  const flatListRef = useRef<any>(null);

  const [messages, setMessages] = useState<Messages[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modaldata, setModalData] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(modaldata);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  }, []);

  //open AI Api calling in handleSubmit

  const handleSubmit = async (Text: string) => {
    const formData = new FormData();
    formData.append("prompt", Text);

    // user's chatstripe
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), isAi: false, value: Text },
    ]);

    // to clear the text input
    setInputText("");

    // bot's chatstripe
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Math.random().toString(), isAi: true, value: "searching....." },
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
        { id: Math.random().toString(), isAi: true, value: parsedData },
      ]);
    } else {
      const err = await response.text();
      alert(err);
    }
  };

  const renderItem = ({ item }: { item: Messages }) => {
    return (
      <View key={item.id} style={styles.chatStripe_View}>
        <View style={styles.chatStripe_Image_View}>
          {item.isAi ? (
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={require("../../../assets/512x512bb.jpg")}
            />
          ) : (
            <MaterialIcons name="emoji-emotions" size={43} />
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
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              onContentSizeChange={scrollToBottom}
            />
          ) : (
            <View style={styles.emptyListView}>
              <Text style={styles.Text_1}>Type your query...</Text>
            </View>
          )}

          <View style={styles.Input_wrapper}>
            <TextInput
              value={inputText}
              placeholder="Enter your query......"
              onChangeText={(text) => setInputText(text)}
              style={styles.Text_Input}
            />
            <TouchableOpacity
              style={styles.send_button_View}
              onPress={() => handleSubmit(inputText)}
            >
              <Image
                style={styles.send_button_image}
                source={require("../../../assets/2654384-middle.png")}
              />
            </TouchableOpacity>
          </View>

          <BottomSheet ref={ref}>
            <View style={styles.bottomsheet_content_view}>
              <View style={styles.bottomsheet_header_View}>
                <Text style={styles.bottomsheet_header_text}>Header</Text>
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
              <View style={styles.bottomsheet_main_content}></View>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
export default ChatViewScreen;
