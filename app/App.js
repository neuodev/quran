import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./components/Layout/Header";

export default function App() {
  return (
    <View style={styles.container}>
      <AppHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
