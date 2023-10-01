import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { getSurahForReceiter } from "../services/quran";
import { SafeAreaView } from "react-native-safe-area-context";
import Surah from "../components/Surah";

const Receiter = ({ route }) => {
  const receiter = route.params.receiter;
  const surahInfos = getSurahForReceiter(receiter.receiterId);

  return (
    <SafeAreaView>
      <Text style={styles.title}>{receiter.name}</Text>
      <FlatList
        data={surahInfos.map((surah) => ({ ...surah, key: surah.surahIdx }))}
        renderItem={({ item: surah }) => <Surah surah={surah} />}
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
});

export default Receiter;
