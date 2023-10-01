import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AudioPlayer from "../components/AudioPlayer";
import { Audio } from "expo-av";
import text from "../ui-text.json";
import { asJsonLog } from "../components/lib/logger";
import * as share from "expo-sharing";
import * as fs from "expo-file-system";
import { surahNameFromIdx } from "../services/quran";

const Surah = ({ route }) => {
  const surah = route.params.surah;
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);
  const [isPlayedOnce, setMediaStutus] = useState(false);
  const [isDownloading, setDownloadStatus] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileExist, setFileExistStatus] = useState(null);

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

  async function setFileStatus() {
    const fileName =
      fs.documentDirectory + surahNameFromIdx(surah.surahIdx) + ".mp3";
    const result = await fs.getInfoAsync(fileName);
    setFileExistStatus(result.exists);
    asJsonLog({ src: "setFileStatus", result });
  }

  useEffect(() => {
    createSound();
    setFileStatus();
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

  function progressCallback(downloadProgress) {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress(progress);
  }

  async function donwloadSurah() {
    if (fileExist === null) return;

    const fileName =
      fs.documentDirectory + surahNameFromIdx(surah.surahIdx) + ".mp3";

    if (fileExist === true) {
      console.log(`File already downloaded: ${fileName}`);
      await saveFile(fileName);
    } else {
      setDownloadStatus(true);

      const downloadResumable = fs.createDownloadResumable(
        surah.surahUrl,
        fileName,
        {},
        progressCallback
      );
      const result = await downloadResumable.downloadAsync();
      if (result) {
        console.log(`Done donwloading "${result.uri}"`);
        saveFile(result.uri);
      }
      setDownloadStatus(false);
      setProgress(0);
    }
  }

  async function saveFile(uri) {
    const canShare = await share.isAvailableAsync();
    if (!canShare) alert("App unable to share the file!");
    share.shareAsync(uri);
  }

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
            // todo: refactor button title
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
          color={status && status.isPlaying === true && "#b91c1c"}
        />

        <Button
          title={
            isDownloading
              ? text["app.surah.downloading"] +
                `(${(progress * 100).toFixed(1)}%)`
              : fileExist
              ? text["app.surah.addToDevice"]
              : text["app.surah.download"]
          }
          onPress={donwloadSurah}
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
