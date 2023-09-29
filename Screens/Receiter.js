import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Receiter = ({ route }) => {
  const receiter = route.params.receiter;
  return (
    <View>
      <Text style={styles.title}>{receiter.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: "right",
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default Receiter;
