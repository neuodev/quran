import React from "react";
import { StyleSheet, Text, View } from "react-native";
import text from "../../ui-text.json";

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text["app.header.label"]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#e2e2e2",
  },
  text: {
    textAlign: "right",
    fontWeight: 500,
    fontSize: 30,
  },
});

export default AppHeader;
