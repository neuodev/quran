import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AudioPlayer from "./AudioPlayer";
import { Audio } from "expo-av";

const Surah = ({ surah }) => {
  const [sound, setSound] = useState(null);

  async function playSound(uri) {
    console.log(`Loading Sound for : ${uri}`);
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          setSound(null);
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <TouchableOpacity onPress={() => playSound(surah.surahUrl)}>
        <Text style={styles.surahName}>
          ({surah.surahIdx}) {surah.name}
        </Text>
        {sound && <AudioPlayer sound={sound} />}
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
