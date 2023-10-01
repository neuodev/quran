import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Surah = ({ route }) => {
  const surah = route.params.surah;
  return (
    <View>
      <Text style={styles.title}>{surah.name}</Text>
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

export default Surah;
