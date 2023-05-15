import React, { useState } from "react";
import { Text, TextInput, View, Alert, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Antdesign from "@expo/vector-icons/AntDesign";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../components/Button";
import { styles } from "./style";

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

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
            navigation.navigate("Home");
          })
          .catch((error) => {
            console.log("authentication error == ", error);
            alert(error);
          });
      } catch (error) {
        Alert.alert("all field required");
      }
    }
  };

  const handlePressCheck = () => {
    if (
      email.length === 0 &&
      password.length === 0 &&
      firstName.length === 0 &&
      lastName.length === 0
    ) {
      Alert.alert("all fields required");
    } else {
      setIsCheck(!isCheck);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back_Icon}
        >
          <Antdesign name="arrowleft" size={30} color="#FFFF" />
        </TouchableOpacity>
        <View style={{ width: "70%" }}>
          <Text style={styles.header_Text}>Registration</Text>
        </View>
      </View>
      <KeyboardAwareScrollView>
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
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              {hidePassword ? (
                <Ionicons style={styles.Icon} name="eye-off" size={20} />
              ) : (
                <Ionicons style={styles.Icon} name="eye" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Check_View}>
          <TouchableOpacity
            style={styles.Check_Box}
            onPress={() => handlePressCheck()}
          >
            {isCheck ? (
              <Antdesign name="check" size={13} color={"#FFF"} />
            ) : null}
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={{}}>I accept</Text>
            <Text style={styles.Text_1}>Terms of Use</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          {isCheck ? (
            <View style={styles.Button}>
              <Button
                Title="SignUp"
                onPress={handleSignUp}
                titleStyle={{ fontWeight: "700" }}
              />
            </View>
          ) : (
            <View style={styles.Button}>
              <Button
                Title="SignUp"
                Pressable={false}
                style={{ opacity: 0.5 }}
                titleStyle={{ fontWeight: "700" }}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
