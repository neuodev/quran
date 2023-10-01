import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Surah = ({ surah, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.surahName}>
          ({surah.surahIdx}) {surah.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  surahName: {
    textAlign: "right",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Surah;
