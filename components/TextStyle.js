import React from "react";
import { Text } from "react-native";
import { secondaryColor } from "../Global/Color";

export default function TextStyle({ children, style }) {
  return (
    <Text style={[{ fontSize: 20, color: secondaryColor }, style]}>
      {children}
    </Text>
  );
}
