import { StyleSheet, View, Text } from "react-native";
import text from "../../ui-text.json";

export default function AppHeader() {
  return (
    <View style={styles.constainer}>
      <Text style={styles.label}>{text["app.header.label"]}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ca8a04",
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    color: "#18181b",
  },
});
