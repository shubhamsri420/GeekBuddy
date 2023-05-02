import AntDesign from "@expo/vector-icons/AntDesign";
import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        setLoading(true);
        setEmail("");
        setPassword("");
        console.log(user);
        navigation.navigate("Home");
        setLoading(false);
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#8cc36a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" animating={loading} />
      ) : null} */}
      <View style={styles.main_Content}>
        <View style={styles.input_wrapper}>
          <TextInput
            placeholder="Email"
            selectionColor={"black"}
            style={styles.Input}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.input_wrapper}>
          <TextInput
            placeholder="Password"
            selectionColor={"black"}
            style={styles.Input}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#8cc36a",
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => handleLogin()}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#8cc36a"
              animating={loading}
            />
          ) : (
            <Text
              style={{
                padding: 10,
                color: "#FFFF",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              SignIn
            </Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            // backgroundColor: "red",
            marginTop: 5,
          }}
        >
          <Text style={{ padding: 5 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#8cc36a", padding: 5 }}>Sign Up here</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            borderRadius: 5,
            marginTop: 15,
            flexDirection: "row",
          }}
        >
          <AntDesign name="googleplus" size={20} color={"#FFFF"} />
          <Text
            style={{
              padding: 10,
              color: "#FFFF",
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            SIGN IN WITH GOOGLE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#507dc0",
            borderRadius: 5,
            marginTop: 15,
            flexDirection: "row",
          }}
        >
          <AntDesign name="facebook-square" size={20} color={"#FFFF"} />
          <Text
            style={{
              padding: 10,
              color: "#FFFF",
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            SIGN IN WITH FACEBOOK
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({
  main_Content: {
    backgroundColor: "#FFFFFF",
    // height: "30%",
    width: "80%",
    padding: 15,
  },
  input_wrapper: {
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    marginTop: 15,
    width: "100%",
  },
  Input: {
    padding: 8,
    color: "#000000",
  },
});
