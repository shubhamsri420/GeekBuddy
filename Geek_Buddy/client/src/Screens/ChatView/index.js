import React, { Component, useCallback, useRef } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../firebase";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";

const ChatScreen = () => {
  const navigation = useNavigation();
  const ref = useRef(null);
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

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-500);
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#138bf5",
          }}
        >
          <TouchableOpacity onPress={onPress}>
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
          <BottomSheet ref={ref}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#1d83ee",
                gap: 10,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FFFF",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ height: 80, width: 80 }}
                    source={require("../../../assets/avatar.png")}
                  />
                </View>

                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#FFFF",
                      fontWeight: "400",
                    }}
                  >
                    @Dainel123
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "#FFFF",
                      fontWeight: "700",
                    }}
                  >
                    Hey,Daniel!
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  backgroundColor: "#FFFF",
                  paddingTop: 10,
                }}
              >
                <Button
                  style={{ backgroundColor: "#1d83ee" }}
                  title={"History"}
                  onPress={() => {}}
                />
                <Button
                  style={{ backgroundColor: "#1d83ee" }}
                  title={"Important Notes"}
                />
                <Button
                  style={{ backgroundColor: "#1d83ee" }}
                  title={"history"}
                />
              </View>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};
export default ChatScreen;
