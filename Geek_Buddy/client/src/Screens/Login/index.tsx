import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "@firebase/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignInContext } from "../../contexts/authContext";
import { styles } from "./style";
import Button from "../../components/Button";
import { color } from "react-native-reanimated";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const { dispatchSignedIn } = useContext(SignInContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
      } else {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
      }
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) => {
        if (user) {
          dispatchSignedIn({
            type: "UPDATE_SIGN_IN",
            payload: { userToken: "signed-in" },
          });
        }
        setEmail("");
        setPassword("");
        setLoading(false);
      });
    } catch (error: any) {
      Alert.alert(error.name, error.message);
    }
  };
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.main_Content}>
        <KeyboardAwareScrollView>
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
              secureTextEntry={hidePassword}
            />

            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              {hidePassword ? (
                <Ionicons style={styles.Icon} name="eye-off" size={20} />
              ) : (
                <Ionicons style={styles.Icon} name="eye" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.SignIn_Button}>
            <Button Title="SignIn" onPress={handleLogin} />
          </View>
          <View style={styles.SignUp_Box}>
            <Text style={styles.Text_1}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={[styles.Text_1, { color: "#1d83ee" }]}>
                Sign Up here
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.Social_button, { backgroundColor: "red" }]}
          >
            <AntDesign name="googleplus" size={20} color={"#FFFF"} />
            <Text style={styles.Social_button_title}>SIGN IN WITH GOOGLE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.Social_button, { backgroundColor: "#1d83ee" }]}
          >
            <AntDesign name="facebook-square" size={20} color={"#FFFF"} />
            <Text style={styles.Social_button_title}>
              SIGN IN WITH FACEBOOK
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
