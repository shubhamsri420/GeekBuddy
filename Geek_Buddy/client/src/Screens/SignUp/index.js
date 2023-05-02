import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Antdesign from "@expo/vector-icons/AntDesign";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";

const SignUp = () => {
  const navigation = useNavigation();
  const [isCheck, setIsCheck] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== ""
    ) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((user) => {
            setLoading(false);
            console.log(user, "===========------=======");
            navigation.navigate("Home");
          })
          .catch((error) => {
            console.log("authentication error == ", error);
            alert(error);
          });
      } catch (error) {
        console.log(error);
        alert("all field required");
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#FFFF" }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ left: 15 }}
          >
            <Antdesign name="arrowleft" size={30} color="#FFFF" />
          </TouchableOpacity>
          <View style={{ width: "70%" }}>
            <Text style={styles.header_Text}>Registration</Text>
          </View>
        </View>

        <View style={styles.main_content}>
          <View style={styles.input_wrapper}>
            <TextInput
              placeholder="First name"
              selectionColor={"black"}
              style={styles.Input}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View style={styles.input_wrapper}>
            <TextInput
              placeholder="Last name"
              style={styles.Input}
              selectionColor={"black"}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.input_wrapper}>
            <TextInput
              placeholder="Email"
              style={styles.Input}
              selectionColor={"black"}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.input_wrapper}>
            <TextInput
              placeholder="Password"
              style={styles.Input}
              selectionColor={"black"}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: 15,
              width: 15,
              backgroundColor: "#8cc36a",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setIsCheck(!isCheck)}
          >
            {isCheck ? (
              <Antdesign name="check" size={13} color={"#FFF"} />
            ) : null}
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={{}}>I accept</Text>
            <Text style={{ color: "green", left: 3 }}>Terms of Use</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          {isCheck ? (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#8cc36a",
                borderRadius: 5,
              }}
              onPress={() => handleSignUp()}
            >
              <Text
                style={{
                  padding: 15,
                  color: "#FFFF",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                SignUp
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#8cc36a",
                borderRadius: 5,
                opacity: 0.5,
              }}
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
                    padding: 15,
                    color: "#FFFF",
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  SignUp
                </Text>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#8cc36a",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  header_Text: {
    padding: 15,
    fontSize: 25,
    fontWeight: "700",
    color: "#FFFF",
  },
  main_content: {
    padding: 20,
    // backgroundColor: "#FFFFFF",
  },
  input_wrapper: {
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    padding: 2,
    marginTop: 15,
  },
  Input: {
    padding: 10,
    color: "#000000",
  },
});
