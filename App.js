import { StyleSheet, View } from "react-native";
import AppHeader from "./components/Layout/Header";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/Home";
import text from "./ui-text.json";
import { useState } from "react";
import Receiter from "./Screens/Receiter";

const Stack = createNativeStackNavigator();

export default function App() {
  const [receiter, setReceiter] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={text["app.home.label"]} component={HomeScreen} />
        <Stack.Screen
          name={receiter ? receiter.name : text["app.general.receiter"]}
          component={Receiter}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
