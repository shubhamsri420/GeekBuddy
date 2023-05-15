import React, { Component, useCallback, useEffect, useRef } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../firebase";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import * as Speech from "expo-speech";
import { styles } from "./style";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const ref = useRef<any>(null);
  const [isLoaded] = useFonts({
    "mrt-bold": require("../../../assets/Fonts/Quicksand-Bold.ttf"),
    "mrt-mid": require("../../../assets/Fonts/Quicksand-Medium.ttf"),
    "mrt-reg": require("../../../assets/Fonts/Quicksand-Regular.ttf"),
    "Dan-bold": require("../../../assets/Fonts/DancingScript-Bold.ttf"),
    "Dan-med": require("../../../assets/Fonts/DancingScript-Medium.ttf"),
  });

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login" as never);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function for open bottomsheet
  const handlePressMenu = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  }, []);

  //function for converting Text into speech

  const TextToSpeech = () => {
    const thingToSay = "Hello shubham,are you still there?";
    Speech.speak(thingToSay);
    Speech.getAvailableVoicesAsync();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePressMenu}>
            <AntDesign
              style={{ padding: 15 }}
              name="menu-fold"
              size={30}
              color="#FFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogOut()}>
            <AntDesign
              style={{ right: 10, padding: 15 }}
              name="logout"
              size={30}
              color="#FFFF"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.main_Content}>
          <View style={styles.LogoAndText_Box}>
            <View style={{}}>
              <Text style={styles.Text_1}>Hello, Geek</Text>
            </View>
            <View style={{}}>
              <Image
                style={styles.Logo}
                source={require("../../../assets/512x512bb.jpg")}
              />
            </View>
            <View style={styles.Text_Container}>
              <Text style={styles.Text_2}>How can I help</Text>
              <Text style={styles.Text_2}>you?</Text>
            </View>
          </View>

          <View style={styles.Image_Container}>
            <Image
              style={styles.Image}
              source={require("../../../assets/chatScreen.png")}
            />
          </View>

          <View style={styles.button_container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("ChatScreen" as never)}
            >
              <AntDesign
                style={styles.button_Icon}
                name="wechat"
                size={50}
                color="#FFF"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => TextToSpeech()}
            >
              <Ionicons
                style={styles.button_Icon}
                name="mic"
                size={50}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
          <BottomSheet ref={ref}>
            <View style={styles.BSheet_main_Content}>
              <View style={styles.BSheet_header}>
                <View style={styles.BSheet_ImageContainer}>
                  <Image
                    style={{ height: 80, width: 80 }}
                    source={require("../../../assets/avatar.png")}
                  />
                </View>

                <View style={styles.BSheet_TextContainer}>
                  <Text style={styles.Email}>@Dainel123</Text>
                  <Text style={styles.Name}>Hey,Daniel!</Text>
                </View>
              </View>
              <View style={styles.Button_Container}>
                <Button
                  style={{ backgroundColor: "#1d83ee" }}
                  Title={"History"}
                  onPress={() => {}}
                />
                <Button
                  style={{ backgroundColor: "#1d83ee" }}
                  Title={"Important Notes"}
                  onPress={() => {}}
                />
              </View>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
export default HomeScreen;
