import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AudioPlayer from "../components/AudioPlayer";
import { Audio } from "expo-av";
import text from "../ui-text.json";

const Surah = ({ route }) => {
  const surah = route.params.surah;
  const [sound, setSound] = useState(null);

  async function playSound() {
    const uri = surah.surahUrl;
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
      <Text style={styles.title}>{surah.name}</Text>

      <View>{sound && <AudioPlayer sound={sound} />}</View>
      <View>
        <Button title={text["app.surah.play"]} onPress={playSound} />
      </View>
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
