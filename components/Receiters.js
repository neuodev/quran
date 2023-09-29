import React from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getReceiters } from "../services/quran";
import { SafeAreaView } from "react-native-safe-area-context";

const Receiters = ({ onPress }) => {
  const receiters = getReceiters();
  return (
    <SafeAreaView>
      <FlatList
        data={receiters.map((receiter) => ({
          ...receiter,
          key: receiter.receiterId,
        }))}
        renderItem={({ item: receiter }) => (
          <TouchableOpacity onPress={() => onPress(receiter)}>
            <View style={styles.listItem} key={receiter.receiterId}>
              <Text style={styles.listItemText}>{receiter.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
  },
  listItemText: {
    textAlign: "right",
    fontSize: 22,
  },
});

export default Receiters;
