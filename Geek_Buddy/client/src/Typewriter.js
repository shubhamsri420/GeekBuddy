import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const TypeWriter = ({ text, speed, textColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
