import { Text, View } from "react-native";
import Receiters from "../components/Receiters";
import text from "../ui-text.json";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Receiters
        onPress={(receiter) =>
          navigation.navigate(text["app.general.receiter"], { receiter })
        }
      />
    </View>
  );
};
export default HomeScreen;
