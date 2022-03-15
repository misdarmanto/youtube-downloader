import React from "react";
import { TouchableOpacity } from "react-native";
import { primary } from "../Global/Color";
import { heightPercentage } from "../Global/Dimensions";

export default function ButtonStyle({ children, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor: primary,
          height: heightPercentage(8),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          marginVertical: heightPercentage(1),
        },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}
