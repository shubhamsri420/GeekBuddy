import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Speech from "expo-speech";

interface PropsType {
  text?: string | undefined;
  speed?: number | undefined;
  textColor?: string | undefined;
}
type Text1 = string;

const TypeWriter: React.FC<PropsType> = ({ text, speed, textColor }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const speak = (Text: string) => {
    const thingToSay = Text;
    Speech.speak(thingToSay);

    // Speech.speed(1);
  };

  useEffect(() => {
    speak(text);
  }, []);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timerId = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timerId);
    }
  }, [currentIndex, text.length, speed]);

  return (
    <Text
      style={{
        color: textColor,
        fontSize: 20,
        fontStyle: "italic",
      }}
    >
      {text.slice(0, currentIndex)}
    </Text>
  );
};
export default TypeWriter;
