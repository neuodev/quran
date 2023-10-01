import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AudioPlayer from "../components/AudioPlayer";
import { Audio } from "expo-av";
import text from "../ui-text.json";
import { asJsonLog } from "../components/lib/logger";

const Surah = ({ route }) => {
  const surah = route.params.surah;
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);
  const [isPlayedOnce, setMediaStutus] = useState(false);

  async function createSound() {
    const uri = surah.surahUrl;
    console.log(`Loading Sound for : ${uri}`);
    const { sound } = await Audio.Sound.createAsync({ uri });
    sound.setOnPlaybackStatusUpdate((status) => {
      setStatus(status);
    });

    setSound(sound);
  }

  async function playSound() {
    if (!sound) return;
    await sound.playAsync();
  }

  async function pauseSound() {
    if (!sound) return;
    await sound.pauseAsync();
    setMediaStutus(true);
  }

  async function stopSound() {
    if (!sound) return;
    //! pause vs stop vs start vs create
    await sound.stopAsync();
  }

  useEffect(() => {
    createSound();
  }, []);

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

      {/* <View>{sound && <AudioPlayer sound={sound} />}</View> */}
      {sound === null ? (
        <Text style={styles.loading}>{text["app.general.loading"]}</Text>
      ) : null}
      <View>
        <Button
          title={
            status === null
              ? text["app.surah.play"]
              : status.isPlaying
              ? text["app.surah.stop"]
              : isPlayedOnce
              ? text["app.surah.continue"]
              : text["app.surah.play"]
          }
          disabled={sound === null}
          onPress={async () => {
            console.log(asJsonLog({ isPlaying: status.isPlaying }));
            if (!status) return;
            if (status.isPlaying) return await pauseSound();
            return await playSound();
          }}
        />
        <Button
          title={text["app.surah.stop"]}
          disabled={sound === null}
          style={styles.stopBtn}
          color={"#b91c1c"}
          onPress={stopSound}
        />
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
  loading: {
    textAlign: "right",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  stopBtn: {
    color: "#b91c1c",
  },
});

export default Surah;
