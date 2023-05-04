import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../firebase";

const ChatScreen = () => {
  const navigation = useNavigation();
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
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
        <TouchableOpacity onPress={() => {}}>
          <AntDesign
            style={{ padding: 10 }}
            name="menu-fold"
            size={30}
            color="#FFFF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogOut()}>
          <AntDesign
            style={{ right: 10, padding: 10 }}
            name="logout"
            size={30}
            color="#FFFF"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f7f7f6",
          borderRadius: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View style={{}}>
            <Text
              style={{
                color: "#138bf5",
                fontSize: 30,
                padding: 10,
                fontFamily: "Dan-bold",
              }}
            >
              Hello, Geek
            </Text>
          </View>
          <View style={{}}>
            <Image
              style={{ height: 150, width: 150, borderRadius: 50 }}
              source={require("../../../assets/512x512bb.jpg")}
            />
          </View>
          <View style={{ width: "100%", padding: 5, alignItems: "center" }}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#138bf5",
                  fontSize: 30,
                  fontFamily: "Dan-bold",
                }}
              >
                How can I help
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#138bf5",
                  fontSize: 30,
                  fontFamily: "Dan-bold",
                }}
              >
                you?
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ height: 300, width: "90%" }}
            source={require("../../../assets/chatScreen.png")}
          />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 15,
            padding: 15,
            // backgroundColor: "green",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              // flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1d83ee",
              borderRadius: 100,
              elevation: 8,
            }}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <AntDesign
              style={{ padding: 10 }}
              name="wechat"
              size={50}
              color="#FFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1d83ee",
              borderRadius: 100,
              elevation: 8,
            }}
          >
            <Ionicons
              style={{ padding: 10 }}
              name="mic"
              size={50}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ChatScreen;
