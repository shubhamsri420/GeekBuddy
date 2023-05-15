import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type OnPressEvent = () => void;
interface StyleType {
  backgroundColor: string;
}

interface PropsTypes {
  Title?: string | undefined;
  onPress?: OnPressEvent | undefined;
  style?: StyleType | undefined;
  titleStyle?: TextStyle | undefined;
  Pressable?: boolean | undefined;
}

interface ButtonStyle {
  button: ViewStyle;
  buttonText: TextStyle;
}

const Button: React.FC<PropsTypes> = ({
  Title,
  onPress,
  style,
  titleStyle,
  Pressable = true,
}) => {
  return (
    <>
      {Pressable ? (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
          <Text style={[styles.buttonText, titleStyle]}>{Title}</Text>
        </TouchableOpacity>
      ) : (
        <View style={[styles.button, style]}>
          <Text style={[styles.buttonText, titleStyle]}>{Title}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create<ButtonStyle>({
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
});

export default Button;
