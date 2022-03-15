import React from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentage, widthPercentage } from "./Dimensions";
import { backgroundColor } from "./Color";

export default function Layout({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentage(3),
    paddingVertical: heightPercentage(3),
    backgroundColor: backgroundColor,
  },
});
