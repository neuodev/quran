import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getSurahForReceiter } from "../services/quran";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import AudioPlayer from "../components/AudioPlayer";

const Receiter = ({ route }) => {
  const receiter = route.params.receiter;
  const surahInfos = getSurahForReceiter(receiter.receiterId);

  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);

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
    <SafeAreaView>
      <Text style={styles.title}>{receiter.name}</Text>

      <FlatList
        data={surahInfos.map((surah) => ({ ...surah, key: surah.surahIdx }))}
        renderItem={({ item: surah }) => (
          <View>
            <TouchableOpacity onPress={() => playSound(surah.surahUrl)}>
              <Text style={styles.surahName}>
                ({surah.surahIdx}) {surah.name}
              </Text>
              {sound && <AudioPlayer sound={sound} />}
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
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
  surahName: {
    textAlign: "right",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default Receiter;
