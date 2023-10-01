import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { asJsonLog } from "../lib/logger";
import { sleep } from "../lib/time";

const AudioPlayer = ({ sound }) => {
  const [status, setStatus] = useState(null);
  const progress = status
    ? (status.positionMillis / status.durationMillis) * 100
    : 0;

  async function statusUpdateHandler() {
    while (true) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded === false) break;
      if (status.didJustFinish || progress === 100) {
        setStatus(null);
        await sound.unloadAsync();
        break;
      }
      asJsonLog({ status });
      setStatus(status);
      await sleep(3_000); // 3sec
    }
  }

  useEffect(() => {
    statusUpdateHandler();
    return () => setStatus(null);
  }, []);

  asJsonLog({
    progress,
    positionMillis: status && status.positionMillis,
    durationMillis: status && status.durationMillis,
    uri: status && status.uri,
  });

  if (!status || Number.isNaN(progress)) return null;

  return (
    <View>
      <Text>{progress.toFixed(0).toString().padStart(2, "0")}%</Text>
    </View>
  );
};

export default AudioPlayer;
